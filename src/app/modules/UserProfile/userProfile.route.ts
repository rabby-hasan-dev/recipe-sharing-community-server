import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { UserProfileControllers } from './userProfile.controller';
import { updateUserValidationSchema } from './userProfile.validation';

const router = express.Router();

router.get('/me', UserProfileControllers.getAllUsers);

router.get('/', UserProfileControllers.getAllUsers);
router.get('/:id', UserProfileControllers.getSingleUser);
router.patch(
  '/:id',
  validateRequest(updateUserValidationSchema),
  UserProfileControllers.updateUser,
);

router.delete('/:id', UserProfileControllers.deleteUser);

export const UserProfileRoutes = router;
