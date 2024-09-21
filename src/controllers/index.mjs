import {
  getAssetUsecase,
  getPortfolioUsecase,
  sendMarketOrderUsecase,
} from '../usecases/index.mjs';

import { mapAssetsResponse } from './mappers/mapAssetsResponse.mjs';
import { mapPortfolioResponse } from './mappers/mapPortfolioResponse.mjs';
import { mapOrderResponse } from './mappers/mapOrderResponse.mjs';

import createControllerInstance from './createController.mjs';

const getPortfolioController = createControllerInstance({
  usecase: getPortfolioUsecase,
  responseMapper: mapPortfolioResponse,
});

const getAssetController = createControllerInstance({
  usecase: getAssetUsecase,
  responseMapper: mapAssetsResponse,
});

const sendMarketOrderController = createControllerInstance({
  usecase: sendMarketOrderUsecase,
  responseMapper: mapOrderResponse,
});

export { getAssetController, getPortfolioController, sendMarketOrderController };
