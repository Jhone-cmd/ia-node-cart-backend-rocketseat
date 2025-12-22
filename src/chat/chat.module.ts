import { Module } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PostgresService, ChatService],
})
export class ChatModule {}
