import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import { cpus } from 'os';

import cpuRouter from './routes/cpu';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Processing on cluster : ${process.pid}`);
  next();
});

app.use('/cpu', cpuRouter);

app.get('/', (req, res) => res.send('Hello world'));

if (cluster.isMaster) {
  const CLUSTERS = +(process.env.CLUSTERS || 0) || cpus().length;
  for (let i = 0; i < CLUSTERS; i++) {
    cluster.fork();
  }
} else {
  app.listen(port, () => {
    console.log(`Running ${process.pid} on port ${port}`);
  });
}
