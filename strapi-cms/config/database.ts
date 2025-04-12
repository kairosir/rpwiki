import { DatabaseConfig } from '@strapi/strapi';

const config: DatabaseConfig = {
  connection: {
    client: 'postgres',
    connection: {
      host: process.env.DATABASE_HOST || 'db.wlpawjhyybiwylghxnhw.supabase.co',
      port: Number(process.env.DATABASE_PORT) || 5432,
      database: process.env.DATABASE_NAME || 'postgres',
      user: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      ssl: {
        rejectUnauthorized: false
      },
      pool: {
        min: 0,
        max: 5
      }
    },
    debug: false,
  },
};

export default config;
