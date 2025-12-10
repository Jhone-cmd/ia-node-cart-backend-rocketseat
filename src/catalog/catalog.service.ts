import { Injectable } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  embedding: number[] | null;
};

@Injectable()
export class CatalogService {
  constructor(private readonly postgresService: PostgresService) {}

  async getCatalog() {
    const result = await this.postgresService.client.query<Product>(
      `SELECT products.id, products.name, products.price, products.embedding, json_build_object('id', stores.id, 'name',      stores.name) as store FROM products JOIN stores ON products.store_id = stores.id`
    );
    return result.rows;
  }
}
