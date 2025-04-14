export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: 'aws-0-eu-west-2.pooler.supabase.com',
      port: 6543,
      database: env('DATABASE_NAME', 'postgres'),
      user: 'postgres.wlpawjhyybiwylghxnhw',
      password: env('DATABASE_PASSWORD'),
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
});
