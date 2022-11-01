import logger from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  translateTime: true,
});
const log = logger(stream);

export default log;
