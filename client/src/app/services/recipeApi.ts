import { Recipe } from "../types";
import { api } from "./api";

export const recipeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRecipe: builder.mutation<void, FormData>({
      query: (data) => ({
        url: "/recipes/",
        method: "POST",
        body: data,
      }),
    }),
    getRecipe: builder.query<Recipe, string>({
      query: (id) => ({
        url: `/recipes/${id}`,
      }),
    }),
  }),
});
export const { createRecipe, getRecipe } = recipeApi.endpoints;
export const { useCreateRecipeMutation, useGetRecipeQuery, useLazyGetRecipeQuery } = recipeApi;
