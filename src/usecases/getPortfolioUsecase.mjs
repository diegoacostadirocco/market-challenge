const getPortfolioUsecase = (dependencies) => async (params) => {
  const { getPortfolioEntity, marketModel, USER_NOT_FOUND_ERROR, NO_PORTFOLIO_DATA_FOUND } =
    dependencies;

  const validParams = getPortfolioEntity(params);

  const { rows } = await marketModel.getPortfolio(validParams).catch((error) => {
    if (error.message == USER_NOT_FOUND_ERROR) throw new Error(USER_NOT_FOUND_ERROR);
    throw new Error(error.message);
  });

  if (!rows.length) throw new Error(NO_PORTFOLIO_DATA_FOUND);

  return rows;
};

export default getPortfolioUsecase;
