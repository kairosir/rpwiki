import { DatabaseConfig } from '@strapi/strapi';
import { parse } from 'pg-connection-string';

const config: DatabaseConfig = {
  connection: {
    client: 'postgres',
    connection: (() => {
      if (process.env.DATABASE_URL) {
        const parsed = parse(process.env.DATABASE_URL);
        return {
          host: parsed.host,
          port: Number(parsed.port),
          database: parsed.database,
          user: parsed.user,
          password: parsed.password,
          ssl: {
            rejectUnauthorized: false
          }
        };
      }
      return {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: {
          rejectUnauthorized: false
        }
      };
    })()
  }
};

export default config;
