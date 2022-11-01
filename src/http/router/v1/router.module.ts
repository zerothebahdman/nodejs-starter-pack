import { Router } from 'express';
import authRoute from './auth.route';
import memberRoute from './member.route';
import transactionRoute from './transaction.route';
import newsRouter from './news.route';

const router = Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/members', route: memberRoute },
  { path: '/transactions', route: transactionRoute },
  { path: '/news', route: newsRouter },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
