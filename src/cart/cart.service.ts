import { Injectable } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';

type Cart = {
  id: number;
  user_id: number;
  product_id: number;
  store_id: number;
  quantity: number;
  active: boolean;
  created_at: Date;
};

@Injectable()
export class CartService {
  constructor(private readonly postgresService: PostgresService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const result = await this.postgresService.client.query(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );
    return result.rows[0];
  }
}
