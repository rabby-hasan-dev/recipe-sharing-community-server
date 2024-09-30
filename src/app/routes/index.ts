import { Router } from 'express';
import { UserRegisterRoutes } from '../modules/User/user.route';
import { UserProfileRoutes } from '../modules/UserProfile/userProfile.route';
import { AdminRoutes } from '../modules/AdminProfile/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { RecipeRoutes } from '../modules/Recipe/recipe.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/register',
    route: UserRegisterRoutes,
  },
  {
    path: '/profile',
    route: UserProfileRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/Recipes',
    route: RecipeRoutes,
  },
  // {
  //   path: '/premium',
  //   route: RecipeRoutes,
  // },
  // {
  //   path: '/feed',
  //   route: RecipeRoutes,
  // },
  // {
  //   path: '/social',
  //   route: RecipeRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
