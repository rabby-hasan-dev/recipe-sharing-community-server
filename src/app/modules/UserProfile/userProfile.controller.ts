import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserProfileServices } from './userProfile.service';

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserProfileServices.getSingleUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserProfileServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { User } = req.body;
  const result = await UserProfileServices.updateUserIntoDB(id, User);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserProfileServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted succesfully',
    data: result,
  });
});



export const UserProfileControllers = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
};
