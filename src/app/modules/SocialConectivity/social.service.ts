

// -------------- Rate Recpe section ---------
const rateRecipeIntoDB = async (id: string, payload: any) => {

};

const getRecipeRatingsFromDB = async (id: string) => {

};

const getAvarageRecipeRatingsFromDB = async (id: string) => {

};
// -------------- Comment Recpe section ---------
const postRecipeCommentIntoDB = async (id: string, payload: any) => {

};

const getRecipeCommentFromDB = async (id: string) => {

};

const editRecipeCommentFromDB = async (id: string) => {

};
const deleteRecipeCommentFromDB = async (id: string) => {

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
