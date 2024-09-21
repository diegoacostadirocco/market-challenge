const mapOrderResponse = (params) => {
  const { size, price, side, status, datetime, name } = params;

  return Object.freeze({
    stockAmount: size,
    price,
    action: side,
    status,
    assetName: name,
    datetime,
  });
};

export { mapOrderResponse };
