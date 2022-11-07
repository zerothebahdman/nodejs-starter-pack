import { Router } from 'express';
import authRoute from './auth.route';

const router = Router();

const defaultRoutes = [{ path: '/auth', route: authRoute }];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
