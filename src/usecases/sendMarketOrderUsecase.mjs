const sendMarketOrderUsecase = (dependencies) => async (params) => {
  const { sendMarketOrderEntity, marketModel } = dependencies;

  const validParams = sendMarketOrderEntity(params);

  return marketModel.sendMarketOrder(validParams).catch((error) => {
    throw new Error(error.message);
  });
};

export default sendMarketOrderUsecase;
