import recipesRouter from "../backend/routes/recipes";
import ordersRouter from "../backend/routes/orders";
import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import path from 'path';
import express from 'express';
import cors from 'cors';
// import debug from 'debug';
import webpackDev from './dev';

const dev = process.env.NODE_ENV !== 'production';
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors());

if (dev) {
  app.use(webpackDev.comp).use(webpackDev.hot);
}

// link the routes to the app (postman testing/localhost testing)
app.use('/api/recipe', recipesRouter);
app.use('/api/order', ordersRouter);

const runningMessage = `Server running at http://localhost:${port}`;
app.listen(port, () => {
  console.log(runningMessage);
});