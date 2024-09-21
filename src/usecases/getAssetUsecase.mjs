const getAssetUsecase = (dependencies) => async (params) => {
  const { getAssetEntity, marketModel, NO_ASSET_DATA_FOUND } = dependencies;

  const validParams = getAssetEntity(params);

  const { rows } = await marketModel.getAsset(validParams).catch((error) => {
    throw new Error(error.message);
  });
  if (!rows.length) throw new Error(NO_ASSET_DATA_FOUND);

  return rows;
};

export default getAssetUsecase;
