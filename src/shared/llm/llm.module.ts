import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiLlmService } from './gemini-llm.service';
import { LlmService } from './llm.service';
import { OpenAiLlmService } from './openai-llm.service';

@Module({
  providers: [
    {
      provide: LlmService,
      useFactory: (configService: ConfigService) => {
        const provider = configService.get<string>('LLM_PROVIDER');
        if (provider === 'openai') {
          return new OpenAiLlmService(configService);
        }

        if (provider === 'gemini') {
          return new GeminiLlmService(configService);
        }
        throw new Error(`Unsupported LLM provider: ${provider}`);
      },
      inject: [ConfigService],
    },
  ],
  exports: [LlmService],
})
export class LlmModule {}
