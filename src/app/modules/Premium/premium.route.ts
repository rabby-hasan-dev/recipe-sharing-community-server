import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import { PremiumControllers } from './premium.controller';



const router = express.Router();

router.post('/subscribe', auth(USER_ROLE.user), PremiumControllers.subscribeToPremium);
router.get('/status', auth(USER_ROLE.user || USER_ROLE.admin), PremiumControllers.getPremiumStatus);
router.get('/recipes', auth(USER_ROLE.user || USER_ROLE.admin), PremiumControllers.getPremiumRecipes);

export const PremiumRoutes = router;
