const mapPortfolioResponse = (rows) => {
  const totalValue = rows.reduce((total, item) => {
    const itemTotalValue = parseFloat(item.total_value) || 0;
    return total + itemTotalValue;
  }, 0);

  const availableCash = rows.reduce((totalCash, item) => {
    return totalCash + (parseFloat(item.cash_available) || 0);
  }, 0);

  const formattedAssets = rows.map((asset) => {
    const { instrumentid, total_size, last_price, total_value } = asset;
    return {
      id: instrumentid,
      quantity: parseInt(total_size, 10),
      totalValue: parseFloat(total_value).toFixed(2),
      lastPrice: last_price ? parseFloat(last_price).toFixed(2) : 'N/A',
    };
  });

  return {
    totalPortfolioValue: totalValue.toFixed(2),
    availableCash: availableCash.toFixed(2),
    assets: formattedAssets,
  };
};

export { mapPortfolioResponse };
