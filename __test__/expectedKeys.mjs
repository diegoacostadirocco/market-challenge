const assetKeysController = ['id', 'name', 'performance', 'quantity', 'totalValue', 'ticker'];

const portfolioKeysController = ['totalPortfolioValue', 'availableCash', 'assets'];

const orderKeysController = ['stockAmount', 'price', 'assetName', 'action', 'status', 'datetime'];

const assetKeysUsecase = [
  'close',
  'date',
  'datetime',
  'high',
  'id',
  'low',
  'open',
  'ticker',
  'previousclose',
  'name',
  'instrumentid',
  'price',
  'size',
  'userid',
  'side',
  'status',
  'type',
];

const portfolioKeysUsecase = [
  'cash_available',
  'instrumentname',
  'last_price',
  'total_size',
  'total_value',
];

const orderKeysUsecase = [
  'id',
  'instrumentid',
  'size',
  'price',
  'type',
  'side',
  'status',
  'datetime',
  'userid',
  'ticker',
  'name',
];

const orderKeysEntity = [
  'accountNumber',
  'stockAmount',
  'ticker',
  'price',
  'orderType',
  'side',
  'status',
];

export {
  assetKeysController,
  portfolioKeysController,
  orderKeysController,
  orderKeysEntity,
  assetKeysUsecase,
  portfolioKeysUsecase,
  orderKeysUsecase,
};
