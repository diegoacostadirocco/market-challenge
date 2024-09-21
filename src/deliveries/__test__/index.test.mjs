import { before } from 'mocha';
import { expect } from '../../../__test__/index.mjs';
import {
  nockGetAssetOk,
  nockGetPortfolioOk,
  nockPostMarketOrderOk,
} from '../../../__test__/nockEndpoints.mjs';
import nock from 'nock';
import axios from 'axios';
import { assetKeysController, portfolioKeysController } from '../../../__test__/expectedKeys.mjs';
import config from 'config';

const { baseUrl } = config;

const makeRequest = async (method, url, data = {}) => {
  const response = await axios({
    method,
    url,
    baseURL: baseUrl,
    data,
    timeout: 10000,
  });
  return response;
};

describe('happy paths', async () => {
  before(() => {
    nockGetAssetOk();
    nockGetPortfolioOk();
    nockPostMarketOrderOk();
  });

  after(() => {
    nock.cleanAll();
  });

  it('should call asset flow and return the asset if it exists', async () => {
    const ticker = 'BMA';
    const response = await makeRequest('get', `/asset?ticker=${ticker}`);
    expect(response.status).to.equal(200);
    expect(response.data[0]).to.have.keys(assetKeysController);
  });
  it('should call portfolio flow and return the portfolio if it exists', async () => {
    const accountNumber = 10001;
    const response = await makeRequest('get', `/portfolio?accountNumber=${accountNumber}`);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.keys(portfolioKeysController);
    expect(response.data.assets[0]).to.have.keys('lastPrice', 'quantity', 'totalValue');
  });
  it('should call market order flow and return the order if it was successful', async () => {
    const accountNumber = 10001;
    const ticker = 'BMA';
    const price = null;
    const stockAmount = 10;
    const orderType = 'MARKET';
    const side = 'BUY';

    const response = await makeRequest('post', '/market-order', {
      accountNumber,
      ticker,
      price,
      orderType,
      side,
      stockAmount,
    });
    expect(response.status).to.equal(200);
  });
});
