import { faker, expect } from '../../../__test__/index.mjs';
import { expectCodeThrowAsync } from '../../../__test__/expectError.mjs';
import { getAssetUsecase, getPortfolioUsecase, sendMarketOrderUsecase } from '../index.mjs';
import { INSTRUMENT_NOT_FOUND } from '../../constants/errors.mjs';
import { assetKeysUsecase, portfolioKeysUsecase } from '../../../__test__/expectedKeys.mjs';

describe('happy path - getAssetUsecase', async () => {
  it('should return the asset if it exists', async () => {
    const ticker = 'BMA';
    const response = await getAssetUsecase({ ticker });
    expect(response).to.be.an('array');

    expect(response[0]).to.have.keys(assetKeysUsecase);
  });
});

describe('happy path - getPortfolioUsecase', async () => {
  it('should return the portfolio if it exists', async () => {
    const accountNumber = 10001;
    const response = await getPortfolioUsecase({ accountNumber });

    expect(response).to.be.an('array');

    expect(response[0]).to.have.keys(portfolioKeysUsecase);
  });
});

describe('happy path - sendMarketOrderUsecase', async () => {
  it('should return the order if it was successful', async () => {
    const accountNumber = 10001;
    const ticker = 'BMA';
    const price = 2000;
    const orderType = 'LIMIT';
    const side = 'BUY';
    const stockAmount = 0;
    const response = await sendMarketOrderUsecase({
      accountNumber,
      stockAmount,
      ticker,
      price,
      orderType,
      side,
    });

    expect(response).to.be.an('object');

    expect(response).to.have.keys(orderKeysUsecase);
  });
});

describe('error paths', async () => {
  it('should throw an error if the asset does not exist', async () => {
    const ticker = faker.lorem.word();

    await expectCodeThrowAsync({
      method: () => getAssetUsecase({ ticker }),
      errorMessage: INSTRUMENT_NOT_FOUND,
    });
  });
});
