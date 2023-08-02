import * as express from "express";

import prfRouter from "./prf";
import fcltyRouter from "./fclty";
import userRouter from "./user";

const router = express.Router();

router.use("/user", prfRouter);

router.use("/prf", prfRouter);

router.use("/fclty", fcltyRouter);

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

export default router;
