import express from 'express';
import http from 'http';
import prfUpdate from './service/prfUpdate';
import dataSource from './config/dataSource';
import router from './router/index';
import errorHandler from './middlewares/errorHandler';
import schedule from 'node-schedule';

const connectDB = async (): Promise<void> => {
  try {
    await dataSource.initialize();
    console.log('DB connected!');
  } catch (err) {
    console.error(err);
  }
};

const loadExpressApp = async () => {
  await connectDB();

  const app: express.Express = express();
  app.use(express.json());

  app.use(router);
  app.use(errorHandler);
  app.all('*', (_, res) => {
    res.status(404).json({
      data: null,
      error: {
        message: 'URL Not Found',
      },
    });
  });

  return app;
};

const startServer = async () => {
  const app: express.Express = await loadExpressApp();

  const server: http.Server = http.createServer(app);

  const port: number | string = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer()
  .then(() => {
    console.log('Server started!');
  })
  .catch((err) => {
    console.error(err);
  });

schedule.scheduleJob('009***', ()=>{prfUpdate()});