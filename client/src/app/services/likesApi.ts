import { LikeResponse } from "../types";
import { api } from "./api";

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleLike: builder.mutation<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
        method: "POST",
      }),
    }),
    isRecipeLiked: builder.query<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/liked/recipes/${recipeId}`,
      }),
    }),
  }),
});

export const { toggleLike, isRecipeLiked } = likesApi.endpoints;
export const { useToggleLikeMutation, useIsRecipeLikedQuery, useLazyIsRecipeLikedQuery } = likesApi;
