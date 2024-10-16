/*
  Warnings:

  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteRecipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Follows" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LikedRecipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "received" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" TEXT NOT NULL,
ADD COLUMN     "mainImageUrl" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RecipeComment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RecipeTag" (
    "id" TEXT NOT NULL,
    "tagCategoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeTagCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeTagCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCommentImage" (
    "id" TEXT NOT NULL,
    "recipeCommentId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "RecipeCommentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeToRecipeTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeTag_name_key" ON "RecipeTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeTagCategory_name_key" ON "RecipeTagCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToRecipeTag_AB_unique" ON "_RecipeToRecipeTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToRecipeTag_B_index" ON "_RecipeToRecipeTag"("B");

-- AddForeignKey
ALTER TABLE "RecipeTag" ADD CONSTRAINT "RecipeTag_tagCategoryId_fkey" FOREIGN KEY ("tagCategoryId") REFERENCES "RecipeTagCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCommentImage" ADD CONSTRAINT "RecipeCommentImage_recipeCommentId_fkey" FOREIGN KEY ("recipeCommentId") REFERENCES "RecipeComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeTag" ADD CONSTRAINT "_RecipeToRecipeTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeTag" ADD CONSTRAINT "_RecipeToRecipeTag_B_fkey" FOREIGN KEY ("B") REFERENCES "RecipeTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
