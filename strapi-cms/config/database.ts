import { DatabaseConfig } from '@strapi/strapi';

const config: DatabaseConfig = {
  connection: {
    client: 'postgres',
    connection: process.env.DATABASE_URL || {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};

export default config;
