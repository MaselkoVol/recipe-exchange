import { MetaType, RecipeShortInfo, User } from "../types";
import { api } from "./api";

export const currentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/current",
      }),
    }),
    getCurrentUserRecipes: builder.query<
      { data: RecipeShortInfo[]; meta: MetaType },
      { page: string; limit: string; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/current/recipes",
        params: { page, limit, search },
      }),
    }),
  }),
});

export const { getCurrentUser, getCurrentUserRecipes } = currentApi.endpoints;
export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserRecipesQuery,
  useLazyGetCurrentUserRecipesQuery,
} = currentApi;
