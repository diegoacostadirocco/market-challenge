import nock from 'nock';

const nockGetAssetOk = () => {
  nock('http://localhost:4566')
    .get('/asset?ticker=BMA')
    .reply(200, [
      {
        id: 1,
        name: 'Banco Macro',
        performance: 0.1,
        quantity: 10,
        totalValue: 100,
        ticker: 'BMA',
      },
    ]);
};

const nockGetPortfolioOk = () => {
  nock('http://localhost:4566')
    .get('/portfolio?accountNumber=10001')
    .reply(200, {
      totalPortfolioValue: 1000,
      availableCash: 900,
      assets: [
        {
          lastPrice: 100,
          quantity: 10,
          totalValue: 1000,
        },
      ],
    });
};

const nockPostMarketOrderOk = () => {
  nock('http://localhost:4566').post('/market-order').reply(200);
};

export { nockGetAssetOk, nockGetPortfolioOk, nockPostMarketOrderOk };
