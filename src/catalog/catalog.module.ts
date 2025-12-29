import { Module } from '@nestjs/common';
import { LlmService } from '../shared/llm.service';
import { PostgresService } from '../shared/postgres.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [],
  controllers: [CatalogController],
  providers: [CatalogService, PostgresService, LlmService],
  exports: [CatalogService],
})
export class CatalogModule {}
