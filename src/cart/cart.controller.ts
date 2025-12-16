import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Put(':cartId/items/:productId')
  async updateCartItem(
    @Body() body: { quantity: number },
    @Param('productId') productId: string
  ) {
    if (!body.quantity || body.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }
    await this.cartService.updateCartItem(
      this.userId,
      Number(productId),
      body.quantity
    );
  }

  @Delete(':cartId/items/:productId')
  async deleteCartItem(@Param('productId') productId: string) {
    await this.cartService.deleteCartItem(this.userId, Number(productId));
  }
}
