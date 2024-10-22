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
import { BookmarkBorder, Favorite, FavoriteBorder, Save, Visibility, VisibilityRounded } from "@mui/icons-material";
import MyCard from "../../components/UI/MyCard";
import Carousel from "../../components/UI/carousel/Carousel";
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

type Props = {};

const Recipe = (props: Props) => {
  const isAuth = useSelector((selector: RootState) => selector.auth.status);
  const [loginOpen, setLoginOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // open additional images in fullscreen
  const [selectedURL, setSelectedURL] = useState<string | null>(null);

  const params = useParams();
  const { data: recipe, isLoading: isRecipeLoading, isError: isRecipeError } = useGetRecipeQuery(params.id || "");
  const [toggleLike, { isError: toggleLikeError }] = useToggleLikeMutation();
  const [getIsLiked, { data: isLikedData, isError: isLikedError, status: isLikedStatus }] = useLazyIsRecipeLikedQuery();
  const [isLiked, setIsLiked] = useState(false);

  const triggerLike = useDebounce({
    debounce: () => {
      if (!recipe?.id) return;
      toggleLike(recipe.id);
    },
    instantCallback: () => setIsLiked(!isLiked),
    delay: 300,
  });

  useEffect(() => {
    if (isLikedStatus !== "fulfilled") return;
    if (isLikedData?.liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isLikedStatus]);

  useEffect(() => {
    setIsLiked(false);
  }, [isLikedError]);

  useEffect(() => {
    if (!recipe?.id || !toggleLikeError) return;
    const timeoutId = setTimeout(() => {
      getIsLiked(recipe.id);
    }, 300); // Delay by 300ms	 or as needed
    return () => clearTimeout(timeoutId); // Cleanup
  }, [toggleLikeError]);

  useEffect(() => {
    if (!recipe) return;
    getIsLiked(recipe.id);
  }, [recipe]);

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
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  position: "relative",
                  gap: 1,
                }}
              >
                {recipe.tags &&
                  recipe.tags[0] &&
                  recipe.tags.map((tag) => <Chip color={"primary"} label={tag.name} key={tag.id} />)}
              </Box>
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
              sx={{ width: "100%", slidesPerView: { xs: 2, md: 4 }, aspectRatio: { xs: "8/3", md: "16/3" } }}
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
          <MyCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: { xs: "100%", md: "auto" },
                alignItems: "center",
                flexWrap: "wrap",
                columnGap: 4,
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
                <IconButton size={"small"}>
                  <BookmarkBorder sx={{ fontSize: 30 }} />
                </IconButton>
              </Box>
              <Box>created: {formatDate(recipe.createdAt)}</Box>
              <ClientLink sx={{ ml: "auto" }} to={`users/${recipe.author.id}`}>
                <UserInfo reversed avatarSize={40} hideEmail user={recipe.author} />
              </ClientLink>
            </Box>
          </MyCard>
        </Grid>
      </Grid>

      <UnregisteredDialog open={loginOpen} setIsOpen={setLoginOpen} />
    </Container>
  );
};

export default Recipe;
