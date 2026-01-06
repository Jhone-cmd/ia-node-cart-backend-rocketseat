import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresService } from '../postgres.service';
import { GeminiLlmService } from './gemini-llm.service';
import { LlmService } from './llm.service';
import { OpenAiLlmService } from './openai-llm.service';

@Module({
  providers: [
    PostgresService,
    {
      provide: LlmService,
      useFactory: (
        configService: ConfigService,
        postgresService: PostgresService
      ) => {
        const provider = configService.get<string>('LLM_PROVIDER');
        if (provider === 'openai') {
          return new OpenAiLlmService(configService);
        }

        if (provider === 'gemini') {
          return new GeminiLlmService(configService, postgresService);
        }
        throw new Error(`Unsupported LLM provider: ${provider}`);
      },
      inject: [ConfigService, PostgresService],
    },
  ],
  exports: [LlmService],
})
export class LlmModule {}
