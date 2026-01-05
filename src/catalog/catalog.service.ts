import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmService } from '../shared/llm/llm.service';
import { PostgresService } from '../shared/postgres.service';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  embedding: number[] | null;
};

@Injectable()
export class CatalogService implements OnApplicationBootstrap {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly llmService: LlmService,
    private readonly configService: ConfigService
  ) {}

  async onApplicationBootstrap() {
    if (this.configService.get<string>('NODE_ENV') === 'test') {
      return;
    }
    const products = await this.postgresService.client.query<Product>(
      'SELECT id, name FROM products WHERE embedding IS NULL'
    );

    if (products.rowCount === 0) {
      console.log('No products to embed');
      return;
    }

    await this.llmService.batchEmbedProducts(products.rows);
  }

  async handleEmbeddingWebhook(
    rawBody: string,
    headers: Record<string, string>
  ) {
    console.log('CatalogService.handleEmbeddingWebhook called');

    const results = await this.llmService.handleWebhookEvent(rawBody, headers);

    if (!results || results.length === 0) {
      console.log('No results from handleWebhookEvent');

      return;
    }

    for (const result of results) {
      const { productId, embedding } = result;
      await this.postgresService.client.query(
        'UPDATE products SET embedding = $1::vector WHERE id = $2',
        [JSON.stringify(embedding), productId]
      );

      console.log(`Updated product ${productId} with new embedding`);
    }
  }

  async getCatalog(search = '') {
    let query = `SELECT products.id, products.name, products.price, products.embedding, json_build_object('id', stores.id, 'name', stores.name) as store FROM products JOIN stores ON products.store_id = stores.id`;

    if (search) {
      query += ' WHERE products.name ILIKE $1';
    }

    const result = await this.postgresService.client.query<Product>(
      query,
      search ? [`%${search}%`] : []
    );
    return result.rows;
  }
}
