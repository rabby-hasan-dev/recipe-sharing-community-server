import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UseSearchableFields } from './userProfile.constant';
import { TUserProfile } from './userProfile.interface';
import { UserProfile } from './userProfile.model';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../../constant';
import mongoose from 'mongoose';
import { User } from '../User/user.model';

const getMyProfileIntoDB = async (email: string, role: string) => {
  let result = null;
  if (role === USER_ROLE.user) {
    result = await UserProfile.findOne({ email: email }).populate('user');
  }
  return result;
};

const updateMyProfileIntoDB = async (user: JwtPayload, payload: Partial<TUserProfile>) => {
  const { email, role } = user;
  const userExists = UserProfile.isUserExists(email);

  if (!userExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not Authorized")
  }
  if (role !== USER_ROLE.user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not Authorized")
  }

  const { name, ...remainingUserData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };


  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await UserProfile.findOneAndUpdate({ email: email }, modifiedUpdatedData, { new: true, runValidators: true, })
  return result;
};



const getUserProfileFromDB = async (id: string) => {
  const result = await UserProfile.findById(id);
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const UserQuery = new QueryBuilder(UserProfile.find().populate('User'), query)
    .search(UseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await UserQuery.countTotal();
  const result = await UserQuery.modelQuery;

  return {
    meta,
    result,
  };
};


const deleteUserFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedUserProfile = await UserProfile.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUserProfile) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    // get user _id from deletedUser
    const userId = deletedUserProfile.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedUser;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete User');
  }
};

export const UserProfileServices = {
  updateMyProfileIntoDB,
  getMyProfileIntoDB,
  getAllUsersFromDB,
  getUserProfileFromDB,
  deleteUserFromDB,
};
