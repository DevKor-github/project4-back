import express from 'express';
import * as prfController from '../controller/prf.js';

const router = express.Router();

router.get('/', prfController.getPrfList);
router.get("/update", prfController.updateDB);

export default router;
