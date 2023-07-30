import express from 'express';

import prfRouter from './prf';

import userRouter from './user';
const router = express.Router();

router.use('/prf', prfRouter);
router.use('/user', userRouter);


export default router;
