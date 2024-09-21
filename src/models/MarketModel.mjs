import pkg from 'pg';
const { Pool } = pkg;
import {
  USER_NOT_FOUND_ERROR,
  INSTRUMENT_NOT_FOUND,
  INVALID_PRICE_AMOUNT,
} from '../constants/errors.mjs';
import { ORDERS } from '../constants/index.mjs';

class MarketModel extends Pool {
  constructor(options) {
    super(options);
  }

  async getAsset(queryParams) {
    const { id: instrumentId } = await this.getInstrument(queryParams);

    let query = `
    SELECT *
    FROM orders o
    JOIN instruments i ON o.instrumentId = i.id
    LEFT JOIN marketdata m ON i.id = m.instrumentId
    WHERE o.instrumentId = $1
  `;

    return this.query(query, [instrumentId]);
  }

  async getPortfolio({ accountNumber }) {
    const userId = await this.getUserId(accountNumber);

    const portfolioQuery = `
      SELECT
        i.name AS instrumentname,
        SUM(o.size) AS total_size,
        MAX(md.close) AS last_price,
        COALESCE(SUM(o.size * md.close), 0) AS total_value,
        COALESCE(SUM(CASE WHEN i.type = 'MONEDA' THEN o.size * md.close ELSE 0 END), 0) AS cash_available
      FROM orders o
      LEFT JOIN marketdata md ON o.instrumentId = md.instrumentId
      LEFT JOIN instruments i ON o.instrumentId = i.id
      WHERE o.userId = $1
      AND o.status = 'FILLED'
      GROUP BY i.name;
  `;

    return this.query(portfolioQuery, [userId]);
  }

  async sendMarketOrder({ accountNumber, ticker, stockAmount, price, orderType, side, status }) {
    const userId = await this.getUserId(accountNumber);
    const instrument = await this.getInstrument({ ticker });
    const { id: instrumentId } = instrument;

    const marketData = await this.getMarketData({ instrumentId });
    let size;

    if (orderType === ORDERS.LIMIT && price <= marketData.close) {
      throw new Error(INVALID_PRICE_AMOUNT);
    }
    size = orderType === ORDERS.LIMIT ? Math.floor(price / marketData.close) : stockAmount;

    if (price === null) {
      price = marketData.close;
    }

    const query = `
      INSERT INTO orders (instrumentId, userId, size, price, type, side, status, datetime)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *;
    `;

    const values = [instrumentId, userId, size, price, orderType, side, status];

    const { rows } = await this.query(query, values);
    return { ...rows[0], ...instrument };
  }

  async getUserId(accountNumber) {
    const query = `
    SELECT id
    FROM users
    WHERE accountnumber = $1
  `;

    const { rows } = await this.query(query, [accountNumber]);
    if (rows.length === 0) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }

    return rows[0].id;
  }

  async getInstrument(params) {
    const conditions = [];
    const values = [];

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'ticker' || key === 'name') {
        conditions.push(`${key} = $${values.length + 1}`);
        values.push(value);
      }
    });
    if (conditions.length === 0) {
      throw new Error(
        'You must provide at least one of: ticker or name to search for the instrument.',
      );
    }

    const query = `
    SELECT *
    FROM instruments
    WHERE ${conditions.join(' AND ')}
  `;

    const { rows } = await this.query(query, values);

    if (rows.length === 0) {
      throw new Error(INSTRUMENT_NOT_FOUND);
    }

    return rows[0];
  }

  async getMarketData({ instrumentId }) {
    const query = `
  SELECT * 
FROM marketdata md
WHERE md.instrumentid = $1
  AND md.date = (
    SELECT MAX(date)
    FROM marketdata
    WHERE instrumentid = md.instrumentid
  );

  `;
    const { rows } = await this.query(query, [instrumentId]);
    return rows[0];
  }
}

export default MarketModel;
