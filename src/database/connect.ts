import mongoose from 'mongoose';
import log from '../logging/logger';
import config from '../../config/default';

const connectDb = async () => {
  await mongoose
    .connect(config.DATABASE_URL)
    .then(() => {
      log.info('Application 🚀 Connected to Database Successfully');
    })
    .catch((err) => {
      log.error(err);
    });
};

export default connectDb;
