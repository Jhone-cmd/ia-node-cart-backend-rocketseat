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
      'SELECT * FROM products'
    );
    return result.rows;
  }
}
