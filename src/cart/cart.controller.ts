import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

@Controller('cart')
export class CartController {
  @Post()
  addCart(@Body() body: { productId: number; quantity: number }) {
    if (!(body.productId && body.quantity)) {
      throw new BadRequestException('productId and quantity are required');
    }

    return { message: 'Product added to cart successfully' };
  }
}
