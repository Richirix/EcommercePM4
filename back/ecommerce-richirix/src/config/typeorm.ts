import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: `.env` });


const databaseUrl = process.env.DATABASE_URL;

const config = databaseUrl
  ? {
      type: 'postgres',
      url: databaseUrl,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/**/*.migrations.js'],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'ricardo',
      database: process.env.DB_NAME || 'ecommerce_richirix',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/**/*.migrations.js'],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    };

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
