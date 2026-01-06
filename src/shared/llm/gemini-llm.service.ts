import { Injectable } from '@nestjs/common';
import { LlmService } from './llm.service';

@Injectable()
export class GeminiLlmService extends LlmService {
  suggestCarts(
    relevantProductsByStore: {
      store_id: number;
      products: {
        id: number;
        name: string;
        price: number;
        similarity: number;
      }[];
    }[],
    input: string
  ): Promise<
    | ({
        carts: {
          store_id: number;
          score: number;
          products: { id: number; quantity: number; name: string }[];
        }[];
        response: string;
      } & { responseId: string })
    | null
  > {
    throw new Error('Method not implemented.');
  }
  batchEmbedProducts(products: { id: number; name: string }[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  handleWebhookEvent(
    rawBody: string,
    headers: Record<string, string>
  ): Promise<{ productId: string; embedding: number[] }[] | null> {
    throw new Error('Method not implemented.');
  }
  embedInput(input: string): Promise<{ embedding: number[] } | null> {
    throw new Error('Method not implemented.');
  }
  answerMessage(
    message: string,
    previousMessageId: string | null,
    previousMessages: { content: string; role: string }[]
  ): Promise<
    | ({
        message: string;
        action: {
          type: 'send_message' | 'suggest_carts';
          payload: { input: string } | null;
        };
      } & { responseId: string })
    | null
  > {
    throw new Error('Method not implemented.');
  }
}
