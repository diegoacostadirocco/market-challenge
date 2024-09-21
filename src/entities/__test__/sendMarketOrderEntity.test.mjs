import { faker, expect } from './../../../__test__/index.mjs';
import { expectCodeThrow } from './../../../__test__/expectError.mjs';
import { INVALID_ORDER_TYPE_ERROR, INVALID_TICKER_ERROR } from '../../constants/errors.mjs';
import { sendMarketOrderEntity } from '../index.mjs';
import { orderKeysEntity } from '../../../__test__/expectedKeys.mjs';
describe('sendMarketOrderEntity', () => {
  it('should throw an error if the orderType is not a valid string', () => {
    const orderType = faker.random.number();
    const method = () => sendMarketOrderEntity({ orderType });
    expectCodeThrow({ method, errorMessage: INVALID_ORDER_TYPE_ERROR });
  });
  it('should return an error if neither the orderType is passed', () => {
    const method = () => sendMarketOrderEntity({});
    expectCodeThrow({ method, errorMessage: INVALID_ORDER_TYPE_ERROR });
  });
  it('should return all the properties if they are valid', () => {
    let accountNumber, stockAmount, ticker, price, orderType, side;

    accountNumber = faker.random.number();
    stockAmount = 0;
    ticker = faker.lorem.word();
    price = faker.random.number();
    orderType = 'LIMIT';
    side = 'BUY';

    const response = sendMarketOrderEntity({
      accountNumber,
      stockAmount,
      ticker,
      price,
      orderType,
      side,
    });
    expect(response).to.have.keys(orderKeysEntity);
  });

  it('should return an error if the ticker is passed', () => {
    const orderType = 'MARKET';
    const accountNumber = faker.random.number();
    const method = () => sendMarketOrderEntity({ orderType, accountNumber });
    expectCodeThrow({ method, errorMessage: INVALID_TICKER_ERROR });
  });
});
