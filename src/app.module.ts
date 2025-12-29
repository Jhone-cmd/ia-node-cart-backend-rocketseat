import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { CatalogModule } from './catalog/catalog.module';
import { ChatModule } from './chat/chat.module';
import { WebhooksController } from './webhooks.controller';

@Module({
  imports: [
    CatalogModule,
    CartModule,
    ChatModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [WebhooksController],
  providers: [],
})
export class AppModule {}
