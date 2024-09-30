import { Router } from 'express';
import { UserRegisterRoutes } from '../modules/User/user.route';
import { UserProfileRoutes } from '../modules/UserProfile/userProfile.route';
import { AdminRoutes } from '../modules/AdminProfile/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth/register',
    route: UserRegisterRoutes,
  },
  {
    path: '/users',
    route: UserProfileRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
