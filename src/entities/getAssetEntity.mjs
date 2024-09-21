const getAssetEntity = (dependencies) => (params) => {
  const { isValidString, INVALID_PARAM_ERROR } = dependencies;
  const { ticker = '', name = '' } = params;

  const result = {};

  if (!isValidString(ticker) && !isValidString(name)) {
    throw new Error(INVALID_PARAM_ERROR);
  }

  if (isValidString(ticker)) result.ticker = ticker.trim();
  if (isValidString(name)) result.name = name.trim();

  return Object.freeze(result);
};

export default getAssetEntity;
