import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LlmService } from './llm.service';

@Module({
  providers: [
    {
      provide: LlmService,
      useFactory: (configService: ConfigService) => {
        const provider = configService.get<string>('LLM_PROVIDER');
        if (provider === 'openai') {
          return null;
        }
        throw new Error(`Unsupported LLM provider: ${provider}`);
      },
      inject: [ConfigService],
    },
  ],
  exports: [LlmService],
})
export class LlmModule {}
