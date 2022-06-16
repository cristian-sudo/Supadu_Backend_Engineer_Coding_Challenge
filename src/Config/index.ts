import * as dotenv from 'dotenv';

dotenv.config();

export default {
  environment: process.env.NODE_ENV,
  app_secret: process.env.APP_SECRET,

  express: {
    port: Number(process.env.EXPRESS_PORT),
  },

  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
};
