import { MetaType } from "../types";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<void, { recipeId: string; data: FormData }>({
      query: ({ recipeId, data }) => ({
        url: `/recipes/${recipeId}/comments`,
        method: "POST",
        body: data, // Changed "data" to "body"
      }),
    }),
    getRecipes: builder.query<{ data: Comment[]; count: number; meta: MetaType }, string>({
      query: (recipeId) => ({
        url: `/recipes/${recipeId}/comments`,
      }),
    }),
  }),
});

export const { createComment, getRecipes } = commentApi.endpoints;
export const { useCreateCommentMutation, useGetRecipesQuery, useLazyGetRecipesQuery } = commentApi;
