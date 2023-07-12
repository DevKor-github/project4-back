import * as express from "express";

import prfRouter from "./prf.js";

const router: any = express.Router();

router.use("/prf", prfRouter);

router.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

export default router;
