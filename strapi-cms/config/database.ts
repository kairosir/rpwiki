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
      ssl: process.env.DATABASE_SSL ? {
        rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'false' ? false : true,
      } : false,
    },
    debug: false,
  },
};

export default config;
