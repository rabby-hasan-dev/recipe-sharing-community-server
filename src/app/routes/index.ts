import { Router } from 'express';
import { UserRegisterRoutes } from '../modules/User/user.route';
import { UserProfileRoutes } from '../modules/UserProfile/userProfile.route';
import { AdminRoutes } from '../modules/AdminProfile/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { RecipeRoutes } from '../modules/Recipe/recipe.route';
import { SocailConectivityRoutes } from '../modules/SocialConectivity/social.route';
import { FeedRoutes } from '../modules/Feed/feed.route';
import { PremiumRoutes } from '../modules/Premium/premium.route';
import { FllowRoutes } from '../modules/Follow/follow.route';

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
    path: '/recipes',
    route: RecipeRoutes,
  },
  {
    path: '/premium',
    route: PremiumRoutes,
  },
  {
    path: '/feed',
    route: FeedRoutes,
  },
  {
    path: '/social-conectivity',
    route: SocailConectivityRoutes,
  },
  {
    path: '/follow',
    route: FllowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
