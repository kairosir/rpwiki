import { DatabaseConfig } from '@strapi/strapi';

const config: DatabaseConfig = {
  connection: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
};

export default config;
