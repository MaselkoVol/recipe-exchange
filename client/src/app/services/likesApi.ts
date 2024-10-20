import { LikeResponse } from "../types";
import { api } from "./api";

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addRecipeToLiked: builder.mutation<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
        method: "POST",
      }),
    }),
    removeRecipeFromLiked: builder.mutation<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
        method: "DELETE",
      }),
    }),
    isRecipeLiked: builder.query<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
      }),
    }),
  }),
});

export const { addRecipeToLiked, removeRecipeFromLiked, isRecipeLiked } = likesApi.endpoints;
export const {
  useAddRecipeToLikedMutation,
  useRemoveRecipeFromLikedMutation,
  useIsRecipeLikedQuery,
  useLazyIsRecipeLikedQuery,
} = likesApi;
