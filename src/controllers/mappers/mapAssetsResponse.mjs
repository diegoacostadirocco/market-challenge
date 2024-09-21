const mapAssetsResponse = (rows) => {
  const assetMap = {};

  rows.forEach((row) => {
    const { instrumentid, size, price, ticker, name, close, previousClose } = row;

    if (!assetMap[instrumentid]) {
      assetMap[instrumentid] = {
        id: instrumentid,
        ticker,
        name,
        totalSize: 0,
        totalValue: 0,
        lastPrice: parseFloat(price),
        performance: 0,
      };
    }

    assetMap[instrumentid].totalSize += size;
    assetMap[instrumentid].totalValue += size * parseFloat(price);

    if (close && previousClose) {
      assetMap[instrumentid].performance = ((close - previousClose) / previousClose) * 100;
    } else {
      assetMap[instrumentid].performance = 0;
    }
  });

  return Object.values(assetMap).map((asset) => {
    return {
      id: asset.id,
      ticker: asset.ticker,
      name: asset.name,
      quantity: asset.totalSize,
      totalValue: asset.totalValue.toFixed(2),
      performance: asset.performance.toFixed(2),
    };
  });
};

export { mapAssetsResponse };
