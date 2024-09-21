const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT || 5432,
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:4566',
};
