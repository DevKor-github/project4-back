import * as express from "express";
import * as fcltyController from "../controller/fclty";
import auth from "../middlewares/auth";

const router = express.Router();

router.use(auth);

router.get("/", fcltyController.getFcltyList);
//전체 리스트 받아오기

router.get("/search", fcltyController.getSearchedFcltyList);
/*queryString으로 fcltyName 넘기기
search?pfcltyName= */

router.get("/update", fcltyController.dbUpdate);
//DB를 최신 상태로 업데이트

export default router;
