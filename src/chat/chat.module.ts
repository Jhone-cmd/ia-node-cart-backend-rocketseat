import { Module } from '@nestjs/common';
import { LlmService } from '../shared/llm.service';
import { PostgresService } from '../shared/postgres.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [PostgresService, ChatService, LlmService],
})
export class ChatModule {}
