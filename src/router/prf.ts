import * as express from "express";
import * as prfController from "../controller/prf.js";

const router = express.Router();

router.get("/", prfController.getPrfList);
//전체 리스트 받아오기

router.get("/search", prfController.getSearchedPrfList);
/*queryString으로 prfName,periodFrom,periodTo,fcltyName,prfGenre 넘기기
search?prfName=&periodFrom=&periodTo=&fcltyName=&prfGenre= 공백시 기본값 */

router.get("/update", prfController.dbUpdate);
//DB를 최신 상태로 업데이트

export default router;
