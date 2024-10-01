import express from 'express';
import { FeedControllers } from './feed.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';



const router = express.Router();


router.get('/', FeedControllers.getPublicFeed);
router.get('/premium', auth(USER_ROLE.user), FeedControllers.getPremiumFeed);

export const FeedRoutes = router;
