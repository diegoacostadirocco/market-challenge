import getAssetUsecaseInstance from './getAssetUsecase.mjs';
import getPortfolioUsecaseInstance from './getPortfolioUsecase.mjs';
import sendMarketOrderUsecaseInstance from './sendMarketOrderUsecase.mjs';

import { getAssetEntity, getPortfolioEntity, sendMarketOrderEntity } from '../entities/index.mjs';
import { marketModel } from '../models/index.mjs';

import {
  USER_NOT_FOUND_ERROR,
  NO_ASSET_DATA_FOUND,
  NO_PORTFOLIO_DATA_FOUND,
} from '../constants/errors.mjs';

const getPortfolioUsecase = getPortfolioUsecaseInstance({
  getPortfolioEntity,
  marketModel,
  USER_NOT_FOUND_ERROR,
});

const getAssetUsecase = getAssetUsecaseInstance({
  getAssetEntity,
  marketModel,
  NO_ASSET_DATA_FOUND,
});

const sendMarketOrderUsecase = sendMarketOrderUsecaseInstance({
  sendMarketOrderEntity,
  marketModel,
  NO_PORTFOLIO_DATA_FOUND,
});

export { getAssetUsecase, getPortfolioUsecase, sendMarketOrderUsecase };
