import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserProfileServices } from './userProfile.service';


const getMyProfile = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const result = await UserProfileServices.getMyProfileIntoDB(email, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Update succesfully',
    data: result,
  });
});

const UpdateMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await UserProfileServices.updateMyProfileIntoDB(user, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Profile Get succesfully',
    data: result,
  });
});


const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserProfileServices.getUserProfileFromDB(userId);

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
  UpdateMyProfile,
  getMyProfile,
  getAllUsers,
  getUserProfile,
  deleteUser,
};
