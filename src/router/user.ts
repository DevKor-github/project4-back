import * as express from "express";
import * as userController from "../controller/user";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.post("/login", userController.login);
//id, pw로 로그인

router.post("/register", userController.register);
//id, pw, name으로 가입

router.post("/logout", userController.logout);
//일단은 id를 전송하기 위해 post로 설정

export default router;
