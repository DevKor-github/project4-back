import express from "express";
import * as http from "http";

import dataSource from "./config/dataSource.js";
import router from "./router/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const connectDB: any = async () => {
  try {
    await dataSource.initialize();
    console.log("DB connected!");
  } catch (err) {
    console.error(err);
  }
};

const loadExpressApp: any = async () => {
  await connectDB();

  const app: any = express();
  app.use(express.json());

  app.use(router);
  app.use(errorHandler);
  app.all("*", (_: any, res: any) => {
    res.status(404).json({
      data: null,
      error: {
        message: "URL Not Found",
      },
    });
  });

  return app;
};

const startServer: any = async () => {
  const app: any = await loadExpressApp();

  const server: any = http.createServer(app);

  const port: any = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer()
  .then(() => {
    console.log("Server started!");
  })
  .catch((err: any) => {
    console.error(err);
  });
