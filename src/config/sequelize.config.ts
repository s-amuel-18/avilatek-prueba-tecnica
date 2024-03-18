import { Sequelize } from 'sequelize-typescript';
import { environment } from './environment.config';

const { DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST, DB_SHOW_LOGS } = environment;

export const DATABASE = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  port: DB_PORT,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  models: [__dirname + '../models'],
  logging: DB_SHOW_LOGS ? console.log : false,
});

// DATABASE.addModels([]);
