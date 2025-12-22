import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  private readonly userId = 1; // Placeholder for authenticated user ID

  @Post()
  async createChatSession() {
    const session = await this.chatService.createChatSession(this.userId);
    return session;
  }

  @Get(':sessionId')
  async getChatSession(@Param('sessionId') sessionId: number) {
    const session = await this.chatService.getChatSession(sessionId);

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    return session;
  }
}
