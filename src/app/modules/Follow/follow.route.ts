import express from 'express';
import { followController } from './follow.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';
import validateRequest from '../../middlewares/validateRequest';
import { followValidation } from './follow.validation';


const router = express.Router();




router.post('/follow/:userId',
    auth(USER_ROLE.user),
    // validateRequest(followValidation.FollowingSchema),
    followController.followUser);
router.post('/unfollow/:userId',
    auth(USER_ROLE.user), followController.unfollowUser);
router.get('/:userId/followersCount', followController.getFollowerCount);
router.get('/:userId/followingCount', followController.getFollowingCount);




export const FllowRoutes = router;
