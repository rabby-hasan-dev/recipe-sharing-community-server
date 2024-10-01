import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FeedServices } from './feed.service';



const getPublicFeed = catchAsync(async (req, res) => {

  const result = await FeedServices.getgetPublicFeedFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Public Feed succesfully',
    data: result,
  });
});


const getPremiumFeed = catchAsync(async (req, res) => {

  const result = await FeedServices.getgetPremiumFeedFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Premium Feed succesfully',
    data: result,
  });
});



export const FeedControllers = {
  getPremiumFeed,
  getPublicFeed
};
