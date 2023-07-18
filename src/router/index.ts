import * as express from "express";

import prfRouter from "./prf.js";

const router = express.Router();

router.use("/prf", prfRouter);

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

export default router;
