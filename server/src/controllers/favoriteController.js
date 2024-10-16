const prisma = require("../prismaClient");
const { accessDenied } = require("../utils/errorHanders");
const { recipeMainImageNameToUrl, userAvatarNameToUrl } = require("../utils/imageNamesToUrl");

const FavoriteController = {
  // @desc		Get current user's favorite recipes
  // @route		GET /api/favorite/posts/:userId
  getUserFavoriteRecipes: async (req, res) => {
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
      const favoriteRecipes = await prisma.favoriteRecipe.findMany({
        where: searchQuery,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
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

      favoriteRecipes.forEach((favoriteRecipe) => {
        const recipe = favoriteRecipe.recipe;
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

      const recipesCount = await prisma.favoriteRecipe.count({ where: searchQuery });

      const finalResult = {
        data: favoriteRecipes,
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
  addRecipeToFavorite: async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;

    try {
      const foundRecipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
      if (!foundRecipe) {
        return res.status(404).send({ erorr: "Recipe not found" });
      }
      const favorite = await prisma.favoriteRecipe.findFirst({ where: { AND: [{ userId }, { recipeId }] } });
      if (favorite) {
        return res.status(203).send({ error: "Post already added to favorite" });
      }
      await prisma.favoriteRecipe.create({
        data: {
          userId,
          recipeId,
        },
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  },
  removeRecipeFromFavorite: async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;

    try {
      const foundRecipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
      if (!foundRecipe) {
        return res.status(404).send({ erorr: "Recipe not found" });
      }
      const favoriteRecipe = await prisma.favoriteRecipe.findFirst({ where: { AND: [{ userId }, { recipeId }] } });
      if (!favoriteRecipe) {
        return res.status(204).send({ message: "Post is not in user's favorite" });
      }
      await prisma.favoriteRecipe.deleteMany({
        where: { AND: [{ userId }, { recipeId }] },
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  },
};

module.exports = FavoriteController;
