import express from 'express';

import prfRouter from './prf.js';

const router = express.Router();

router.use('/prf', prfRouter);

router.get('/', (req, res) => {
	res.send('Hello World!');
});

export default router;
