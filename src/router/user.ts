import express from 'express';
import ctrl from '../controller/user';
const router = express.Router();

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);

export default router;