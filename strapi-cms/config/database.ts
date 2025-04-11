import { DatabaseConfig } from '@strapi/strapi';

const config: DatabaseConfig = {
  connection: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      },
    },
    pool: {
      min: 0,
      max: 10,
    },
  },
};

export default config;
