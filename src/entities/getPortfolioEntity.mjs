const getPortfolioEntity = (dependencies) => (params) => {
  const { isValidInteger, INVALID_PARAM_ERROR } = dependencies;
  const { accountNumber = '' } = params;

  if (!isValidInteger(accountNumber)) {
    throw new Error(INVALID_PARAM_ERROR);
  }

  return Object.freeze({ accountNumber });
};

export default getPortfolioEntity;
