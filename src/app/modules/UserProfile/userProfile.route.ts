import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { UserProfileControllers } from './userProfile.controller';
import { updateUserValidationSchema } from './userProfile.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';


const router = express.Router();

router.get('/me', auth(USER_ROLE.user), UserProfileControllers.getMyProfile);
router.put('/me', auth(USER_ROLE.user),
  validateRequest(updateUserValidationSchema),
  UserProfileControllers.UpdateMyProfile);
router.get('/', UserProfileControllers.getAllUsers);
router.get('/:id', UserProfileControllers.getSingleUser);
router.delete('/:id', auth(USER_ROLE.admin || USER_ROLE.user), UserProfileControllers.deleteUser);

export const UserProfileRoutes = router;
