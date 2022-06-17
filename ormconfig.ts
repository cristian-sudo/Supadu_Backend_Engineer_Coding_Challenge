// Remove comments for tests
// import User from './src/Entity/User/user.entity';


module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dropSchema: false,
    entities: [
      'dist/**/*.entity.{js, ts}',
    ],
    synchronize: false,
    migrations: [
      'dist/migrations/*.js',
    ],
    cli: {
      migrationsDir: 'migrations',
    },
  },
  {
    name: 'test',
    type: 'mysql',
    host: process.env.DATABASE_TEST_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dropSchema: false,
    entities: [
      'dist/**/*.entity.{js, ts}',
  //   User
    ],
    synchronize: false,
    migrations: [
      'dist/migrations/*.js',
    ],
    cli: {
      migrationsDir: 'migrations',
    },
  },
];
