import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeedServices } from './premium.service';



const subscribeToPremium = catchAsync(async (req, res) => {

  const result = await FeedServices.subscribeToPremiumIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Public Feed succesfully',
    data: result,
  });
});


const getPremiumStatus = catchAsync(async (req, res) => {

  const result = await FeedServices.getPremiumStatusFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Premium Feed succesfully',
    data: result,
  });
});
const getPremiumRecipes = catchAsync(async (req, res) => {

  const result = await FeedServices.getPremiumRecipesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Premium Feed succesfully',
    data: result,
  });
});



export const PremiumControllers = {
  getPremiumStatus,
  subscribeToPremium,
  getPremiumRecipes
};
