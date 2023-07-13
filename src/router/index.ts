import express from 'express';

import prfRouter from './prf';

const router = express.Router();

router.use('/prf', prfRouter);

export default router;
