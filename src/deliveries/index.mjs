import express from 'express';
import config from 'config';
import {
  getAssetController,
  getPortfolioController,
  sendMarketOrderController,
} from '../controllers/index.mjs';

const app = express();

app.use(express.json());

const { port: appPort } = config;

const port = appPort || 3000;

const controllerAdapter = (controller) => async (req, res) => {
  const params = {
    ...req.query,
    ...req.body,
    ...req.params,
  };
  try {
    const result = await controller({ params: JSON.parse(JSON.stringify(params)) });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

app.get('/portfolio', controllerAdapter(getPortfolioController));

app.post('/market-order', controllerAdapter(sendMarketOrderController));

app.get('/asset', (req, res, next) => {
  const { ticker, name } = req.query;
  if (ticker || name) {
    return controllerAdapter(getAssetController)(req, res, next);
  } else {
    res.status(400).send('Bad Request: Missing required parameters');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app, controllerAdapter };
