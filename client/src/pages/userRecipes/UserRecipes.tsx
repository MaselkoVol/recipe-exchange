import { Box, CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import { useLazyGetCurrentUserRecipesQuery } from "../../app/services/currentApi";
import MyButton from "../../components/UI/MyButton";
import ClientLink from "../../components/UI/ClientLink";
import { AddCircle, Search } from "@mui/icons-material";
import { useColors } from "../../hooks/useColors";
import RecipeShort from "../../components/RecipeShort";
import MyTextField from "../../components/UI/input/MyTextField";
import Form from "../../components/UI/Form";
import { RecipeShortInfo } from "../../app/types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { responseErrorCheck } from "../../utils/functions/responseErrorCheck";
import { motion, useInView } from "framer-motion";

type Props = {};
type QueryType = {
  page: string;
  limit: string;
  search: string;
};

const UserRecipes = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startValues = { limit: "10", page: "1", search: "" };

  const getParams = () => {
    return {
      limit: searchParams.get("limit") || startValues.limit,
      page: searchParams.get("page") || startValues.page,
      search: searchParams.get("search") || startValues.search,
    };
  };
  const initiateParams = () => {
    const modifiedSearchParams = new URLSearchParams(searchParams);
    let isModified = false;
    if (!modifiedSearchParams.has("limit")) {
      modifiedSearchParams.set("limit", startValues.limit);
      isModified = true;
    }
    if (!modifiedSearchParams.has("page")) {
      modifiedSearchParams.set("page", startValues.page);
      isModified = true;
    }
    if (!modifiedSearchParams.has("search")) {
      modifiedSearchParams.set("search", startValues.search);
      isModified = true;
    }
    if (isModified) {
      setSearchParams(modifiedSearchParams, { replace: true });
    }
  };

  const setParams = (value: QueryType, replace?: boolean) => {
    const modifiedSearchParams = new URLSearchParams(searchParams);
    modifiedSearchParams.set("page", value.page);
    modifiedSearchParams.set("limit", value.limit);
    modifiedSearchParams.set("search", value.search);
    setSearchParams(modifiedSearchParams, { replace });
    return value;
  };

  const [getRecipes, { data, error, isFetching }] = useLazyGetCurrentUserRecipesQuery();
  const colors = useColors();
  const [recipes, setRecipes] = useState<RecipeShortInfo[] | null>(null);
  const [meta, setMeta] = useState<{ page: number; limit: number; totalPages: number } | null>(null);
  const [query, setQuery] = useState<QueryType>(getParams());
  const [inputValue, setInputValue] = useState(query.search);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    if (!isWriting) {
      setIsWriting(true);
    }
    const handler = setTimeout(() => {
      setParams({ ...(query || startValues), page: "1", search: inputValue }, true);
      setTimeout(() => {
        setIsWriting(false);
      }, 200);
    }, 300); // 300ms delaye

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    console.log("first");
    initiateParams();
  }, []);
  useEffect(() => {
    if (!isWriting) {
      setInputValue(query.search);
    }
    getRecipes(query);
  }, [query]);
  useEffect(() => {
    setQuery(getParams());
  }, [searchParams]);

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

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          getRecipes(query);
        }}
        sx={{ display: "flex", gap: 2 }}
      >
        <MyTextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          isContrast
          name={"search"}
          fullWidth
          type="search"
          label="search recipe"
        />
        <MyButton disabled={isFetching || isWriting} type="submit" variant="contained">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Search sx={{ opacity: isFetching || isWriting ? 0 : 1 }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <CircularProgress size={28} sx={{ opacity: isFetching || isWriting ? 1 : 0 }} />
          </Box>
        </MyButton>
      </Form>

      {isFetching || !recipes ? (
        ""
      ) : error && responseErrorCheck(error) ? (
        <Typography sx={{ color: colors.palette.error.main }} variant="h5" component="h1">
          {error.data.error}
        </Typography>
      ) : recipes.length === 0 ? (
        <ClientLink disableHoverEffect={true} to={"/recipes/create"}>
          <MyButton fullWidth sx={{ display: "flex", alignItems: "center", gap: 1 }} variant="contained">
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
                onChange={(e, value) => setParams({ ...(query || startValues), page: value.toString() }, false)}
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
