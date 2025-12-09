import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class PostgresService implements OnApplicationBootstrap {
  client: Client;
  logger = new Logger(PostgresService.name);

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      host: this.configService.getOrThrow('PG_HOST'),
      port: Number(this.configService.getOrThrow('PG_PORT')),
      user: this.configService.getOrThrow('PG_USER'),
      password: this.configService.getOrThrow('PG_PASSWORD'),
      database: this.configService.getOrThrow('PG_DATABASE'),
    });
  }

  onApplicationBootstrap() {
    this.client
      .connect()
      .then(() => this.logger.log('Connected to PostgreSQL database'))
      .catch(error =>
        this.logger.error('Failed to connect to PostgreSQL database', error)
      );
  }
}
