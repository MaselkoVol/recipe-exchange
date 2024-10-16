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
  }),
});
export const { createRecipe } = recipeApi.endpoints;
export const { useCreateRecipeMutation } = recipeApi;
