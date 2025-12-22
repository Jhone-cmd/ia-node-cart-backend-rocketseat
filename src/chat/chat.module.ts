import { Module } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [PostgresService, ChatService],
})
export class ChatModule {}
