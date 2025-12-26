import {
  Body,
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

  @Post(':sessionId/messages')
  async addUserMessage(
    @Param('sessionId') sessionId: number,
    @Body('content') content: string
  ) {
    const message = await this.chatService.addUserMessage(sessionId, content);
    return message;
  }

  @Post(':sessionId/actions/:actionId/confirm')
  async confirmAction(
    @Param('sessionId') sessionId: number,
    @Param('actionId') actionId: number
  ) {
    const action = await this.chatService.confirmAction(sessionId, actionId);
    if (!action) {
      throw new NotFoundException('Action not found or already confirmed');
    }
    return action;
  }
}
