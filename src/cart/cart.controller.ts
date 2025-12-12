import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  userId = 1;
  constructor(private readonly cartService: CartService) {}

  @Post()
  addCart(@Body() body: { productId: number; quantity: number }) {
    if (!(body.productId && body.quantity)) {
      throw new BadRequestException('productId and quantity are required');
    }

    return this.cartService.addToCart(
      this.userId,
      body.productId,
      body.quantity
    );
  }

  @Get()
  getCart() {
    const cart = this.cartService.getCart(this.userId);
    if (!cart) {
      throw new BadRequestException('Cart is empty');
    }
    return cart;
  }
}
