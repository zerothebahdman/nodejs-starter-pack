import app from './src/interface/http/express/app';
import config from './config/default';
import log from './src/logging/logger';
import connectDb from './src/database/connect';

const port: number = Number(config.port);
connectDb();

app.listen(port, () => {
  log.info(`App is running on port ${port}`);
});
