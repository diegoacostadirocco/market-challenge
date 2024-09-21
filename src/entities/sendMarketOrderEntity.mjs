const sendMarketOrderEntity = (dependencies) => (params) => {
  const { validateParam, INVALID_ORDER_TYPE_ERROR, ORDERS, MARKET_ORDER_TYPE, STATUSES } =
    dependencies;

  const { accountNumber, ticker, stockAmount, price, orderType, side } = params;

  const validOrder = ORDERS[orderType];
  if (!validOrder) throw new Error(INVALID_ORDER_TYPE_ERROR);

  if (validOrder === ORDERS.LIMIT) {
    validateParam(price, 'price', 'number', (val) => val > 0);
  }

  const status = validOrder === ORDERS.MARKET ? STATUSES.FILLED : STATUSES.NEW;

  const validSide = MARKET_ORDER_TYPE[side];

  validateParam(accountNumber, 'accountNumber', 'number');
  validateParam(ticker, 'ticker', 'string');

  return Object.freeze({
    accountNumber,
    ticker,
    stockAmount,
    price: validOrder === ORDERS.LIMIT ? price : null,
    orderType: validOrder,
    side: validSide,
    status,
  });
};

export default sendMarketOrderEntity;
