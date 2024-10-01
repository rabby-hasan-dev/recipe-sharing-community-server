import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';

const router = express.Router();

//  Admin Controller
router.patch('/profile/me', auth(USER_ROLE.admin), validateRequest(updateAdminValidationSchema), AdminControllers.updateAdmin,
);
router.get('/profile/me', auth(USER_ROLE.admin), AdminControllers.getAdminProfile);

router.get('/', AdminControllers.getAllAdmins);
router.delete('/:adminId', AdminControllers.deleteAdmin);

// User and  Recipe  Controller 






export const AdminRoutes = router;
