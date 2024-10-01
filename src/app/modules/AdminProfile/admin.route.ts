import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';

const router = express.Router();

//  Admin Controller

router.get('/me', auth(USER_ROLE.admin), AdminControllers.getAdminProfile);
router.patch('/me', auth(USER_ROLE.admin), validateRequest(updateAdminValidationSchema), AdminControllers.updateAdmin,
)
router.get('/', auth(USER_ROLE.admin), AdminControllers.getAllAdmins);
router.delete('/:adminId', AdminControllers.deleteAdmin);








export const AdminRoutes = router;
