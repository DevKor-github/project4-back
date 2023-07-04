import express from "express";
import * as prfController from "../controller/prf.js";

const router = express.Router();

router.get("/", prfController.getPrfList);
router.get("/xml2js", prfController.printJson);

export default router;
