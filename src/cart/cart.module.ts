import { Module } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService, PostgresService],
})
export class CartModule {}
