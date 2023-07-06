import express from 'express';
import * as prfController from '../controller/prf.js';

const router = express.Router();

router.post('/',prfController.postData);
router.get('/', prfController.getPrfList);

export default router;
