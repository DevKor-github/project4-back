import express from 'express';
import * as prfController from '../controller/prf';

const router = express.Router();

router.get('/list', prfController.getPrfList);

export default router;
