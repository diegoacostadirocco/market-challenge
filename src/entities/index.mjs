import getAssetEntityInstance from './getAssetEntity.mjs';
import getPortfolioEntityInstance from './getPortfolioEntity.mjs';
import sendMarketOrderEntityInstance from './sendMarketOrderEntity.mjs';

import { isValidString, isValidInteger, validateParam } from '../helpers/validator.mjs';
import { INVALID_PARAM_ERROR, INVALID_ORDER_TYPE_ERROR } from '../constants/errors.mjs';
import { ORDERS, MARKET_ORDER_TYPE, STATUSES } from '../constants/index.mjs';

const getAssetEntity = getAssetEntityInstance({ isValidString, INVALID_PARAM_ERROR });

const getPortfolioEntity = getPortfolioEntityInstance({ isValidInteger, INVALID_PARAM_ERROR });

const sendMarketOrderEntity = sendMarketOrderEntityInstance({
  validateParam,
  INVALID_ORDER_TYPE_ERROR,
  ORDERS,
  MARKET_ORDER_TYPE,
  STATUSES,
});

export { getAssetEntity, getPortfolioEntity, sendMarketOrderEntity };
