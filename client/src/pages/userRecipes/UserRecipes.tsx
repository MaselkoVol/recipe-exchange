import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useLazyGetCurrentUserRecipesQuery } from "../../app/services/currentApi";
import MyButton from "../../components/UI/MyButton";
import ClientLink from "../../components/UI/ClientLink";
import { AddCircle } from "@mui/icons-material";
import { useColors } from "../../hooks/useColors";
import RecipeShort from "../../components/RecipeShort";
import { MetaType, RecipeShortInfo } from "../../app/types";
import { useEffect, useRef, useState } from "react";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import { motion, useInView } from "framer-motion";
import SearchBar from "../../components/SearchBar";
import { StringParamsType, useControlParams } from "../../hooks/useControlParams";

type Props = {};

const UserRecipes = (props: Props) => {
  // the argument is the inital values
  const { initiateParams, getParams, setParams, searchParams } = useControlParams({
    page: "1",
    limit: "10",
    search: "",
  });
  const colors = useColors();
  // function to get recipes from backend
  const [getRecipes, { data, error, isFetching }] = useLazyGetCurrentUserRecipesQuery();
  // recipes is the content that is shown on the page
  const [recipes, setRecipes] = useState<RecipeShortInfo[] | null>(null);
  // meta is information for pagination.
  const [meta, setMeta] = useState<MetaType | null>(null);
  // indicates if user is writing or not
  const [isWriting, setIsWriting] = useState(false);
  // object that contains parameters of the url
  const [query, setQuery] = useState<StringParamsType>(getParams());
  // value in the input form
  const [inputValue, setInputValue] = useState(query.search);

  useEffect(() => {
    // if doesn't have any of initial queries, replace url with correct queries
    initiateParams();
  }, []);

  useEffect(() => {
    setQuery(getParams());
  }, [searchParams]);

  useEffect(() => {
    if (!isWriting) {
      setInputValue(query.search);
    }
    getRecipes(query as any);
  }, [query]);

  useEffect(() => {
    if (isWriting) return;
    setRecipes(data?.data || null);
    setMeta(data?.meta || null);
  }, [data, isWriting]);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 3,
          alignItems: "flex-end",
          justifyContent: "space-between",
          py: 1,
          px: 2,
          bgcolor: colors.bg,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontSize: 26, fontWeight: 700 }} component="h1">
          Your recipes
        </Typography>
        <ClientLink to={"/recipes/create"}>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="h6" component={"h3"}>
            Create new
            <AddCircle />
          </Typography>
        </ClientLink>
      </Box>
      <SearchBar
        getValues={getRecipes}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isFetching={isFetching}
        isWriting={isWriting}
        setIsWriting={setIsWriting}
        setParams={setParams}
        query={query}
      />

      {isFetching || !recipes ? (
        ""
      ) : error && responseErrorCheck(error) ? (
        <Typography sx={{ color: colors.palette.error.main }} variant="h5" component="h1">
          {error.data.error}
        </Typography>
      ) : recipes.length === 0 ? (
        <ClientLink disableHoverEffect={true} to={"/recipes/create"}>
          <MyButton size="large" fullWidth sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="contained">
            Create recipe now
          </MyButton>
        </ClientLink>
      ) : (
        <Stack spacing={2} sx={{ position: "relative" }}>
          {recipes.map((recipe) => (
            <AnimatedRecipeShort key={recipe.id} recipe={recipe} />
          ))}
          {meta?.totalPages !== 1 && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={meta?.totalPages}
                page={parseInt(query.page)}
                onChange={(e, value) => setParams({ ...query, page: value.toString() }, false)}
              />
            </Box>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default UserRecipes;

type AnimatedProps = {
  recipe: RecipeShortInfo;
};

const AnimatedRecipeShort = ({ recipe }: AnimatedProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.2 }}
    >
      <RecipeShort recipe={recipe} />
    </motion.div>
  );
};
