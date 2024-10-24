import { LikeResponse } from "../types";
import { api } from "./api";

export const favoriteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleFavorite: builder.mutation<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/favorite/recipes/${recipeId}`,
        method: "POST",
      }),
    }),
    isAddedToFavorite: builder.query<LikeResponse, string>({
      query: (recipeId) => ({
        url: `/current/favorite/recipes/${recipeId}`,
      }),
    }),
  }),
});

export const { toggleFavorite, isAddedToFavorite } = favoriteApi.endpoints;
export const { useIsAddedToFavoriteQuery, useLazyIsAddedToFavoriteQuery, useToggleFavoriteMutation } = favoriteApi;
