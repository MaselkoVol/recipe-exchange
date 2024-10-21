const prisma = require("../prismaClient");
const { accessDenied, internalServerError } = require("../utils/errorHanders");
const { userAvatarNameToUrl, recipeMainImageNameToUrl } = require("../utils/imageNamesToUrl");

const LikesController = {
  // @desc		Get current user's liked recipes
  // @route		GET /api/likes/posts/:userId
  getUserLikedRecipes: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const userId = req.user.id;
    try {
      const searchQuery = {
        AND: [
          { userId: userId },
          {
            recipe: {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      };
      const likedRecipes = await prisma.likedRecipe.findMany({
        where: searchQuery,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        // get info from recipe
        select: {
          id: true,
          recipe: {
            select: {
              id: true,
              title: true,
              ingredients: true,
              mainImageUrl: true,
              tags: true,
              views: true,
              createdAt: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true,
                  email: true,
                },
              },
              // get likes count
              _count: {
                select: { likes: true }, // Count the number of likes for each recipe
              },
            },
          },
        },
      });

      likedRecipes.forEach((likedRecipe) => {
        const recipe = likedRecipe.recipe;
        if (recipe.author.avatarUrl) {
          recipe.author.avatarUrl = userAvatarNameToUrl(recipe.author.avatarUrl);
        }
        if (recipe.mainImageUrl) {
          recipe.mainImageUrl = recipeMainImageNameToUrl(recipe.mainImageUrl);
        }
        const likesCount = recipe._count.likes;
        delete recipe._count;
        recipe.likesCount = likesCount;
      });

      const recipesCount = await prisma.likedRecipe.count({ where: searchQuery });

      const finalResult = {
        data: likedRecipes,
        meta: {
          page,
          limit,
          totalPages: Math.ceil(recipesCount / limit),
        },
      };
      return res.json(finalResult);
    } catch (error) {
      console.error(error);
      return internalServerError(res);
    }
  },
  toggleLike: async (req, res) => {
    return res.status(400).send({ msg: "hello", liked: false });
    const { recipeId } = req.params;
    const userId = req.user.id;

    try {
      const foundRecipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
      if (!foundRecipe) {
        return res.status(404).send({ erorr: "Recipe not found", liked: false });
      }
      const likedRecipe = await prisma.likedRecipe.findFirst({ where: { AND: [{ userId }, { recipeId }] } });
      if (likedRecipe) {
        await prisma.likedRecipe.deleteMany({
          where: { AND: [{ userId }, { recipeId }] },
        });
        return res.status(204).send({ message: "Post was unliked successfully", liked: false });
      }
      await prisma.likedRecipe.create({
        data: {
          userId,
          recipeId,
        },
      });
      return res.status(200).send({ message: "Post was liked successfully", liked: true });
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  },
  isRecipeLiked: async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;

    try {
      const foundRecipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
      if (!foundRecipe) {
        return res.status(404).send({ erorr: "Recipe not found", liked: false });
      }
      const likedRecipe = await prisma.likedRecipe.findFirst({ where: { AND: [{ userId }, { recipeId }] } });
      if (likedRecipe) {
        return res.status(200).send({ message: "Post is liked by user", liked: true });
      }
      return res.status(204).send({ message: "Recipe is not liked by user", liked: false });
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  },
};

module.exports = LikesController;
