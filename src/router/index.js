import express from 'express';

import prfRouter from './prf.js';

import * as prfController from '../controller/prf.js';

const router = express.Router();

router.use('/prf', prfRouter);

router.post('/', prfController.fetchData);
router.get('/', (req, res) => {
	res.send('Hello World!');
});

export default router;
