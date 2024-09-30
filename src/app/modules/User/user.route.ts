/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserRegisterControllers } from './user.controller';
import { UserValidation } from './user.validation';




const router = express.Router();

router.post(
  '/create-user',

  validateRequest(UserValidation.userValidationSchema),
  UserRegisterControllers.createUser,
);


router.post(
  '/create-admin',
  validateRequest(UserValidation.userValidationSchema),
  UserRegisterControllers.createAdmin,
);



export const UserRegisterRoutes = router;
