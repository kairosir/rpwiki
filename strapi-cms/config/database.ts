export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: `postgresql://${env('DATABASE_USERNAME')}:${env('DATABASE_PASSWORD')}@${env('DATABASE_HOST')}:${env('DATABASE_PORT')}/${env('DATABASE_NAME')}?sslmode=require`,
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
});
