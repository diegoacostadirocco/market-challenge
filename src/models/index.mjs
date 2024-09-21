import MarketModel from './MarketModel.mjs';
import config from 'config';

const { dbUser, dbHost, dbName, dbPassword, dbPort } = config;

const marketModel = new MarketModel({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: dbPort,
});

export { marketModel };
