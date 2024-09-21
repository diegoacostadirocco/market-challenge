import { faker, expect } from '../../../__test__/index.mjs';
import { expectCodeThrowAsync } from '../../../__test__/expectError.mjs';
import {
  getAssetController,
  getPortfolioController,
  sendMarketOrderController,
} from '../index.mjs';
import { INSTRUMENT_NOT_FOUND } from '../../constants/errors.mjs';
import {
  assetKeysController,
  portfolioKeysController,
  orderKeysController,
} from '../../../__test__/expectedKeys.mjs';

describe('happy paths', async () => {
  it('should return the asset if it exists', async () => {
    const ticker = 'BMA';
    const response = await getAssetController({ params: { ticker } });
    expect(response).to.be.an('array');

    expect(response[0]).to.have.keys(assetKeysController);
  });

  it('should return the portfolio if it exists', async () => {
    const accountNumber = 10001;
    const response = await getPortfolioController({ params: { accountNumber } });

    expect(response).to.be.an('object');

    expect(response).to.have.keys(portfolioKeysController);

    expect(response.assets[0]).to.have.keys('id', 'lastPrice', 'quantity', 'totalValue');
  });

  it('should return the order if it was successful', async () => {
    const accountNumber = 10001;
    const ticker = 'BMA';
    const price = null;
    const stockAmount = 10;
    const orderType = 'MARKET';
    const side = 'BUY';

    const response = await sendMarketOrderController({
      params: {
        accountNumber,
        ticker,
        price,
        orderType,
        side,
        stockAmount,
      },
    });

    expect(response).to.be.an('object');

    expect(response).to.have.keys(orderKeysController);
  });
});

describe('error path', async () => {
  it('should throw an error if the asset does not exist', async () => {
    const ticker = faker.lorem.word();
    await expectCodeThrowAsync({
      method: () => getAssetController({ params: { ticker } }),
      errorMessage: INSTRUMENT_NOT_FOUND,
    });
  });
});
