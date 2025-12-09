import { Module } from '@nestjs/common';
import { PostgresService } from '../shared/postgres.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [],
  controllers: [CatalogController],
  providers: [CatalogService, PostgresService],
})
export class CatalogModule {}
