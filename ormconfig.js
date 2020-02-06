const rootDir = process.env.APP_ENV === 'local' ? 'src' : 'build';
module.exports = {
  "type": process.env.DB_CONNECTION,
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "synchronize": false,
  "logging": ["query", "error"],
  entities: [rootDir + '/app/Entity/**/*.{js,ts}'],
  migrations: [rootDir + '/migration/**/*.{js,ts}'],
  subscribers: [rootDir + '/subscriber/**/*.{js,ts}'],
  "cli": {
    "entitiesDir": "src/app/Entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
