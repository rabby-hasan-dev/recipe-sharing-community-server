import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserRegisterControllers } from './user.controller';
import { UserValidation } from './user.validation';
import { multerUpload } from '../../config/multer.config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const router = express.Router();

router.post(
  '/create-user',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserRegisterControllers.createUser,
);

router.post(
  '/create-admin',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    req.body = JSON.parse(req.body.data);

    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserRegisterControllers.createAdmin,
);

export const UserRegisterRoutes = router;
