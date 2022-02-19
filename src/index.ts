import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
