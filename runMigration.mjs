import pkg from 'pg';
const { Client } = pkg;
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cmd = process.argv[2];

async function runSqlFile() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  });

  const downSql = `
    DROP TABLE IF EXISTS marketdata;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS instruments;
    DROP TABLE IF EXISTS users;
  `;

  try {
    await client.connect();
    console.log('Connected to the database');

    let command = '';
    if (cmd === 'up') {
      const sqlFilePath = path.join(__dirname, './database.sql');
      const sql = await fs.readFile(sqlFilePath, 'utf8');
      command = sql;
    } else if (cmd === 'rollback') {
      command = downSql;
    } else {
      console.error('Invalid command. Use "up" to run migrations or "rollback" to drop tables.');
      return;
    }

    await client.query(command);
    console.log(`SQL command executed successfully for ${cmd}`);
  } catch (err) {
    console.error('Error executing SQL file', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
}

runSqlFile();
