import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserProfile } from "../UserProfile/userProfile.model";
import { IRating } from "./social.interface";
import { Comment, Rating } from "./social.model";
import { Recipe } from "../Recipe/recipe.model";


// -------------- Rate Recpe section ---------
const rateRecipeIntoDB = async (userEmail: string, recipeId: string, rating: any) => {


  const userExistsByEmail = await UserProfile.isUserEmailExists(userEmail);
  if (!userExistsByEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Unauthorized!')
  }

  const currentUserId = userExistsByEmail?._id;

  const existingRating = await Rating.findOne({ recipeId, userId: currentUserId });

  if (existingRating) {
    // Update existing rating
    existingRating.rating = rating?.rating;
    await existingRating.save();
  } else {
    // Create new rating
    const newRating = new Rating({ recipeId, userId: currentUserId, ...rating });
    await newRating.save();

    // Push the new rating into the recipe
    await Recipe.findByIdAndUpdate(recipeId, { $push: { ratings: newRating._id } });
  }


};

const getRecipeRatingsFromDB = async (recipeId: string) => {

  const ratings = await Rating.find({ recipeId }).populate('userId').populate('recipeId');
  return ratings;

};

const getAvarageRecipeRatingsFromDB = async (recipeId: string) => {
  const averageRating = await Rating.aggregate([
    { $match: { recipeId } },
    { $group: { _id: null, averageRating: { $avg: '$rating' } } },
  ]);

  // console.log(averageRating);
  return { averageRating: averageRating[0]?.averageRating || 0 }

};
// -------------- Comment Recpe section ---------
const postRecipeCommentIntoDB = async (userEmail: string, recipeId: string, comment: any) => {

  const userExistsByEmail = await UserProfile.isUserEmailExists(userEmail);
  if (!userExistsByEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Unauthorized!')
  }

  const currentUserId = userExistsByEmail?._id;

  const newComment = { recipeId, userId: currentUserId, comment, }


  const savedComment = await Comment.create(newComment);

  await Recipe.findByIdAndUpdate(recipeId, { $push: { comments: savedComment._id } });

  return savedComment;



};

const getRecipeCommentFromDB = async (recipeId: string) => {
  const comments = await Comment.find({ recipeId }).populate('userId').populate('recipeId');
  return comments;
};


const editRecipeCommentFromDB = async (recipeId: string, commentId: string, content: any) => {

  const findRecipeinComment = await Comment.findOne({ recipeId });

  if (!findRecipeinComment) {
    throw new Error("Recipe Comment not exists in this recipe")
  }
  const updateComment = await Comment.findByIdAndUpdate(commentId, { comment: content }, { new: true });

  return updateComment;


};
const deleteRecipeCommentFromDB = async (recipeId: string, commentId: string,) => {

  // 
  await Comment.findByIdAndDelete(commentId);

  await Recipe.findByIdAndUpdate(recipeId, { $pull: { comments: commentId } });


};

// -------------- Vote Recpe section ---------

const upvoteRecipeIntoDB = async (id: string) => {

};

const downvoteRecipeIntoDB = async (id: string) => {

};
const getvotesFromDB = async (id: string) => {

};

export const SocailConectivityServices = {
  rateRecipeIntoDB,
  getRecipeRatingsFromDB,
  getAvarageRecipeRatingsFromDB,
  postRecipeCommentIntoDB,
  getRecipeCommentFromDB,
  editRecipeCommentFromDB,
  deleteRecipeCommentFromDB,
  upvoteRecipeIntoDB,
  downvoteRecipeIntoDB,
  getvotesFromDB

};
