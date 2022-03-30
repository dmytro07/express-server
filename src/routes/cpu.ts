import express from 'express';
import { CPU } from '../services/HighLoadedCode';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(CPU(+(req.query.number || 0)));
});

export default router;
