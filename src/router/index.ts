import * as express from "express";

import prfRouter from "./prf.js";
import fcltyRouter from "./fclty.js";

const router = express.Router();

router.use("/prf", prfRouter);

router.use("/fclty", fcltyRouter);

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

export default router;
