import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CartModule from './cart/cart.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    CatalogModule,
    CartModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
