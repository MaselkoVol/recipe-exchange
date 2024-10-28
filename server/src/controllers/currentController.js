const prisma = require("../prismaClient");
const createDeleteTransaction = require("../utils/deleteFilesTransaction");
const UserController = require("./userController");
const { internalServerError, userNotFound } = require("../utils/errorHanders");
const { deleteFileIfExists } = require("../utils/deleteFileIfExists");
const { getFilePath } = require("../utils/getFilePath");
const { userAvatarNameToUrl, recipeMainImageNameToUrl } = require("../utils/imageNamesToUrl");

const CurrentController = {
  // @desc		Get current user
  // @route		GET /api/users/:id/current
  current: async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          _count: {
            select: {
              followers: true,
              following: true,
              recipes: true,
              receivedMessages: {
                where: { read: false },
              },
            },
          },
        },
      });
      if (!user) {
        return userNotFound(res);
      }

      const followersCount = user._count.followers;
      const followingCount = user._count.following;
      const recipesCount = user._count.recipes;
      const unreadMessages = user._count.receivedMessages;
      delete user._count;
      user.followersCount = followersCount;
      user.followingCount = followingCount;
      user.recipesCount = recipesCount;
      user.unreadMessages = unreadMessages;

      if (user.avatarUrl) {
        user.avatarUrl = userAvatarNameToUrl(user.avatarUrl);
      }
      return res.json(user);
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  },
  // @desc		Get current user's favorite recipes
  // @route		GET /api/users/:id/posts
  getCurrentUserRecipes: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const id = req.user.id;
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        return userNotFound(res);
      }
      const searchQuery = {
        AND: [
          { authorId: id },
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };
      const recipes = await prisma.recipe.findMany({
        where: searchQuery,
        // get info from recipe
        select: {
          id: true,
          title: true,
          ingredients: true,
          mainImageUrl: true,
          createdAt: true,
          tags: true,
          // get likes count
          _count: {
            select: { likes: true, views: true }, // Count the number of likes for each recipe
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      recipes.forEach((recipe) => {
        if (recipe.mainImageUrl) {
          recipe.mainImageUrl = recipeMainImageNameToUrl(recipe.mainImageUrl);
        }
        const likesCount = recipe._count.likes;
        const views = recipe._count.views;
        delete recipe._count;
        recipe.likesCount = likesCount;
        recipe.views = views;
      });

      const recipesCount = await prisma.recipe.count({ where: searchQuery });

      const finalResult = {
        data: recipes,
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
  // @desc		Update user by id
  // @route		PUT /api/users/:id
  updateUser: async (req, res) => {
    const { name, email } = req.body;
    const userId = req.user.id;

    let avatar = null;
    if (req.file) {
      avatar = req.file;
    }

    try {
      if (email) {
        const userWithEmail = await prisma.user.findUnique({
          where: { email },
        });

        if (userWithEmail && userWithEmail.id !== userId) {
          deleteFileIfExists(avatar);
          return res.status(409).send({ error: "This email is already registered." });
        }
      }
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        deleteFileIfExists(avatar);
        return userNotFound(res);
      }
      let filename = null;

      // soft delete of files
      const deleteTransaction = createDeleteTransaction();
      if (avatar && user.avatarUrl) {
        deleteTransaction.add(getFilePath("public", "uploads", "users", user.avatarUrl));
        filename = avatar.filename;
      }
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          email: email || undefined,
          name: name || undefined,
          avatarUrl: filename || undefined,
        },
      });
      deleteTransaction.complete();
      return res.json(updatedUser);
    } catch (error) {
      console.log(error);
      deleteFileIfExists(avatar);
      return internalServerError(res);
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.user;
    try {
      const deleteTransaction = createDeleteTransaction();
      await prisma.$transaction(async (tx) => {
        await UserController.deleteUserChain(deleteTransaction, tx, id);
      });
      deleteTransaction.complete();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  },
};

module.exports = CurrentController;
