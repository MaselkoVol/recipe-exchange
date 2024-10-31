import {
  Box,
  Card,
  Chip,
  Container,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetRecipeQuery } from "../../app/services/recipeApi";
import Image from "../../components/UI/Image";
import UserInfo from "../../components/UserInfo";
import { useColors } from "../../hooks/useColors";
import ClientLink from "../../components/UI/ClientLink";
import { formatDate } from "../../utils/functions/formatDate";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Save,
  Visibility,
  VisibilityRounded,
} from "@mui/icons-material";
import MyCard from "../../components/UI/MyCard";
import Carousel from "../../components/UI/Carousel";
import { SwiperSlide } from "swiper/react";
import MyLabel from "../../components/UI/MyLabel";
import { convertToParagraphs } from "../../utils/functions/convertToParagraphs";
import { useLazyIsRecipeLikedQuery, useToggleLikeMutation } from "../../app/services/likesApi";
import ImageFullscreen from "../../components/UI/ImageFullscreen";
import { debounder } from "../../utils/functions/debouncer";
import { useDebounce } from "../../hooks/useDebounce";
import LoadingPage from "../loadingPage/LoadingPage";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import UnregisteredDialog from "../../components/UnregisteredDialog";
import { useOptimisticButton } from "../../hooks/useOptimisticButton";
import { useLazyIsAddedToFavoriteQuery, useToggleFavoriteMutation } from "../../app/services/favoriteApi";
import { useAddViewMutation } from "../../app/services/viewsApi";
import SelectedTags from "../../components/SelectedTags";
import { Navigation } from "swiper/modules";
import MyTextField from "../../components/UI/input/MyTextField";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";

type Props = {};

const Recipe = (props: Props) => {
  const isAuth = useSelector((selector: RootState) => selector.auth.status);
  const colors = useColors();

  const [loginOpen, setLoginOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // open additional images in fullscreen
  const [selectedURL, setSelectedURL] = useState<string | null>(null);

  const params = useParams();
  const { data: recipe, isLoading: isRecipeLoading, isError: isRecipeError } = useGetRecipeQuery(params.id || "");

  // increment view count, works only once for 1 user
  const [addView] = useAddViewMutation();
  useEffect(() => {
    if (recipe && isAuth) {
      addView(recipe.id);
    }
  }, [recipe, isAuth]);

  const [isLiked, setIsLiked] = useState(false);
  const triggerLike = useOptimisticButton({
    btnValue: isLiked,
    setBtnValue: setIsLiked,
    btnDependencies: recipe?.id,
    useLazyIsBtnActiveQuery: useLazyIsRecipeLikedQuery,
    useToggleBtnMutation: useToggleLikeMutation,
  });
  const [isInFavorites, setIsInFavorites] = useState(false);
  const triggerFavorite = useOptimisticButton({
    btnValue: isInFavorites,
    setBtnValue: setIsInFavorites,
    btnDependencies: recipe?.id,
    useLazyIsBtnActiveQuery: useLazyIsAddedToFavoriteQuery,
    useToggleBtnMutation: useToggleFavoriteMutation,
  });

  return isRecipeError ? (
    <Typography>Error</Typography>
  ) : isRecipeLoading || !recipe ? (
    <LoadingPage />
  ) : (
    <Container sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <MyCard>
            <Typography sx={{ fontWeight: 700 }} variant={matches ? "h4" : "h5"} component="h1">
              {recipe.title}
            </Typography>
          </MyCard>
        </Grid>
        <Grid xs={12} md={6} item>
          {recipe.mainImageUrl && (
            <Image
              sx={{ aspectRatio: { xs: "4/3", md: "initial" }, paddingBottom: "60%", height: "100%" }}
              src={recipe.mainImageUrl || ""}
            />
          )}
        </Grid>
        <Grid xs={12} md={6} item>
          <MyCard
            elevation={0}
            sx={{
              gap: 2,
              minHeight: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <MyLabel>Ingredients</MyLabel>
              <Typography
                sx={{ whiteSpace: "break-spaces", display: "flex", flexDirection: "column", gap: 1.2 }}
                variant="h6"
                component="pre"
              >
                {convertToParagraphs(recipe.ingredients)}
              </Typography>
            </Box>
            <Box>
              <MyLabel>Tags</MyLabel>
              <SelectedTags selectedTags={recipe.tags} color="primary" />
            </Box>
          </MyCard>
        </Grid>
        <Grid xs={12} sx={{ alignSelf: "stretch", gridArea: "biggest" }} item>
          <MyCard sx={{ minHeight: "100%" }}>
            <Typography sx={{ maxWidth: 600, whiteSpace: "break-spaces" }} variant="h6" component="pre">
              {recipe.text}
            </Typography>
          </MyCard>
        </Grid>
        {recipe.images.length > 0 && (
          <Grid xs={12} item>
            <ImageFullscreen selectedURL={selectedURL} setSelectedURL={setSelectedURL} />
            <Carousel
              navigation
              slidesPerView={matches ? 4 : 2}
              spaceBetween={15}
              sx={{ width: "100%", aspectRatio: { xs: "8/3", md: "16/3" } }}
              modules={[Navigation]}
            >
              {recipe.images.map((image) => (
                <SwiperSlide
                  key={image.id}
                  onClick={() => {
                    setSelectedURL(image.imageUrl);
                  }}
                >
                  <Image sx={{ userSelect: "none", width: "100%", height: "100%", zIndex: 100 }} src={image.imageUrl} />
                </SwiperSlide>
              ))}
            </Carousel>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <MyCard
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 1,
                flexGrow: 100,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton onClick={() => (isAuth ? triggerLike() : setLoginOpen(true))} size={"small"}>
                  {isLiked ? (
                    <Favorite sx={{ fontSize: 30 }} color="error" />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: 30 }} color="error" />
                  )}
                </IconButton>
                <IconButton onClick={() => (isAuth ? triggerFavorite() : setLoginOpen(true))} size={"small"}>
                  {isInFavorites ? <Bookmark sx={{ fontSize: 30 }} /> : <BookmarkBorder sx={{ fontSize: 30 }} />}
                </IconButton>
              </Box>
              <Box>created: {formatDate(recipe.createdAt)}</Box>
            </MyCard>
            <MyCard sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <ClientLink sx={{ ml: "auto" }} to={`users/${recipe.author.id}`}>
                  <UserInfo reversed avatarSize={40} hideEmail user={recipe.author} />
                </ClientLink>
              </Box>
            </MyCard>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} sx={{ pt: 2 }}>
            <Typography variant={"h4"} sx={{ color: colors.contrast }}>
              Comments
            </Typography>
            <TextFieldMultiline isContrast label="Write a comment" />
          </Stack>
        </Grid>
      </Grid>

      <UnregisteredDialog open={loginOpen} setIsOpen={setLoginOpen} />
    </Container>
  );
};

export default Recipe;
