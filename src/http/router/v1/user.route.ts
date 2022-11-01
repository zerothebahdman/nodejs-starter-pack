// import { Router } from 'express';
// import { userController } from '../../controllers/controllers.module';
// import {
//   createUser,
//   loginUser,
//   verifyUserEmail,
// } from '../../../../../authentication/authentication.module';
// import { isUserAuthenticated } from '../../middlewares/auth.middleware';

// const route = Router();

// route
//   .route('/')
//   .get(isUserAuthenticated, (req, res, next) => {
//     userController.getAllUsers(req, res, next);
//   })
//   .post((req, res, next) => {
//     createUser.createUser(req, res, next);
//   });

// route.get('/verify-email/:token', (req, res, next) => {
//   verifyUserEmail.execute(req, res, next);
// });

// route.post('/login', (req, res, next) => {
//   loginUser._loginUser(req, res, next);
// });

// export default route;
