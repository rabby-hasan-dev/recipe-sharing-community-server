import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { followServices } from './follow.service';



const followUser = catchAsync(async (req, res) => {
  const userEmail = req?.user?.email;
  const userToFollowId = req.params.userId;


  const result = await followServices.followUserIntoDB(userEmail, userToFollowId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow User succesfully',
    data: result,
  });
});

const unfollowUser = catchAsync(async (req, res) => {
  const userEmail = req?.user?.email;
  const userToFollowId = req.params.userId;


  const result = await followServices.UnfollowUserIntoDB(userEmail, userToFollowId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unfollow User succesfully',
    data: result,
  });
});

const getFollowerCount = catchAsync(async (req, res) => {
  const { recipeId } = req.params;

  const result = await followServices.getFollowerCountFromDB(recipeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follower Count succesfully',
    data: result,
  });
});
const getFollowingCount = catchAsync(async (req, res) => {
  const { recipeId } = req.params;

  const result = await followServices.getFollowingCountFromDB(recipeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Following Count succesfully',
    data: result,
  });
});




export const followController = {
  followUser,
  unfollowUser,
  getFollowerCount,
  getFollowingCount


};
