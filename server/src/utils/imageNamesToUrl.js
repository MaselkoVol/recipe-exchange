const { BASE_URL } = require("./constants");

const recipeImageNameToUrl = (name) => BASE_URL + "/uploads/recipes/" + name;
const recipeMainImageNameToUrl = (name) => BASE_URL + "/uploads/recipes/" + name;
const userAvatarNameToUrl = (name) => BASE_URL + "/uploads/current/" + name;
const commentImagesNameToUrl = (name) => BASE_URL + "/uploads/recipes/" + name;

module.exports = {
  recipeImageNameToUrl,
  recipeMainImageNameToUrl,
  userAvatarNameToUrl,
  commentImagesNameToUrl,
};
