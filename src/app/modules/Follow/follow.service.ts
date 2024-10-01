import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserProfile } from "../UserProfile/userProfile.model";
import { Follower, Following } from "./follow.model";



const followUserIntoDB = async (userEmail: any, userToFollowId: any) => {

  const userExistsByEmail = await UserProfile.isUserEmailExists(userEmail);
  if (!userExistsByEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Unauthorized!')
  }

  const currentUserId = userExistsByEmail?._id;

  const isUserExistsById = UserProfile.isUserExists(userToFollowId);

  if (!isUserExistsById) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Unauthorized!')
  }

  let following = await Following.findOne({ user: currentUserId });
  if (!following) {
    following = new Following({ user: currentUserId, following: [userToFollowId] });
  } else if (!following.following.includes(userToFollowId)) {
    following.following.push(userToFollowId);
  }
  await following.save();

  // Add follower
  let follower = await Follower.findOne({ user: userToFollowId });
  if (!follower) {
    follower = new Follower({ user: userToFollowId, followers: [currentUserId] });
  } else if (!follower.followers.includes(currentUserId)) {
    follower.followers.push(currentUserId);
  }
  await follower.save();
};


const UnfollowUserIntoDB = async (userEmail: any, userToUnfollowId: any) => {

  const userExistsByEmail = await UserProfile.isUserEmailExists(userEmail);
  if (!userExistsByEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Unauthorized!')
  }

  const currentUserId = userExistsByEmail?._id;

  const isUserExistsById = UserProfile.isUserExists(userToUnfollowId);

  if (!isUserExistsById) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Unauthorized!')
  }


  const following = await Following.findOne({ user: currentUserId });
  if (following) {
    following.following = following.following.filter(userId => userId.toString() !== userToUnfollowId);
    await following.save();
  }

  // Remove from followers
  const follower = await Follower.findOne({ user: userToUnfollowId });
  if (follower) {
    follower.followers = follower.followers.filter(userId => userId.toString() !== currentUserId);
    await follower.save();
  }


};

// fllow and following count

const getFollowerCountFromDB = async (userId: string) => {
  const follower = await Follower.findOne({ user: userId });
  return follower ? follower.followers.length : 0;
};
const getFollowingCountFromDB = async (userId: string) => {
  const following = await Following.findOne({ user: userId });
  return following ? following.following.length : 0;
};




export const followServices = {

  followUserIntoDB,
  UnfollowUserIntoDB,
  getFollowerCountFromDB,
  getFollowingCountFromDB
};
