import express from "express";
import http from "http";

import dataSource from "./config/dataSource.js";
import router from "./router/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const connectDB = async () => {
  try {
    await dataSource.initialize();
    console.log("DB connected!");
  } catch (err) {
    console.error(err);
  }
};

const loadExpressApp = async () => {
  await connectDB();

  const app = express();
  app.use(express.json());

  app.use(router);
  app.use(errorHandler);
  app.all("*", (_, res) => {
    res.status(404).json({
      data: null,
      error: {
        message: "URL Not Found",
      },
    });
  });

  return app;
};

const startServer = async () => {
  const app = await loadExpressApp();

  const server = http.createServer(app);

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer()
  .then(() => {
    console.log("Server started!");
  })
  .catch((err) => {
    console.error(err);
  });
