/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../../constant';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAdminProfileFromDB = async (role: string, email: string) => {
  let result = null;
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ email }).populate('user');
  }
  return result;
};


const updateAdminIntoDB = async (user: JwtPayload, payload: Partial<TAdmin>) => {
  const { email, role } = user;

  const userExists = Admin.isUserExists(email);
  if (!userExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not Authorized")
  }
  if (role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not Authorized")
  }

  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ email }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};



const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getAdminProfileFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
