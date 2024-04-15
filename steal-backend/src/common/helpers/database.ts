import * as MySQLStore from 'express-mysql-session';

export const getStoreOptions = (): MySQLStore.Options => {
  const configs: MySQLStore.Options = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    checkExpirationInterval: 86400000, // 1 day
  };

  for (const key in configs) {
    if (!configs[key]) {
      throw new Error(`Missing database configuration: ${key}`);
    }
  }

  return configs;
};
