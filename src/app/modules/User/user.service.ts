import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TUserProfile } from '../UserProfile/userProfile.interface';
import { UserProfile } from '../UserProfile/userProfile.model';
import { Admin } from '../AdminProfile/admin.model';
import { TImageFile } from '../../interface/image.interface';

const createUserIntoDB = async (file: TImageFile, payload: TUser) => {
  // create a user object
  const password = payload?.password || (config.default_password as string);
  const role = 'user';
  const userData: Partial<TUser> = { ...payload, password, role };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const user = newUser[0]._id; //reference _id

    const userProfileData: TUserProfile = {
      user,
      username: payload?.username,
      email: payload?.email,
      profilePicture: file.path,
    };

    // create a student (transaction-2)
    const userProfile = await UserProfile.create([userProfileData], {
      session,
    });

    if (!userProfile.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create UserProfile Data',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return userProfile;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (file: TImageFile, payload: TUser) => {
  // create a user object
  const password = payload?.password || (config.default_password as string);
  const role = 'admin';
  const userData: Partial<TUser> = { ...payload, password, role };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const user = newUser[0]._id; //reference _id

    const adminProfileData: TUserProfile = {
      user,
      username: payload?.username,
      email: payload?.email,
      profilePicture: file?.path,
    };

    // create a student (transaction-2)
    const adminProfile = await Admin.create([adminProfileData], { session });

    if (!adminProfile.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create Admin Profile Data',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return adminProfile;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserRegisterServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
