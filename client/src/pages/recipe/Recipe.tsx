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
import React, { useEffect, useState } from "react";
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
import {
  useAddRecipeToLikedMutation,
  useLazyIsRecipeLikedQuery,
  useRemoveRecipeFromLikedMutation,
} from "../../app/services/likesApi";

type Props = {};

const Recipe = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const colors = useColors();

  const params = useParams();
  const { data: recipe, isLoading: isRecipeLoading, isError: isRecipeError } = useGetRecipeQuery(params.id || "");
  const [likeRecipe, { isError: likeError }] = useAddRecipeToLikedMutation();
  const [unlikeRecipe, { isError: unlikeError }] = useRemoveRecipeFromLikedMutation();
  const [getIsLiked, { data: isLikedData, isError: isLikedError }] = useLazyIsRecipeLikedQuery();
  const [isLiked, setIsLiked] = useState(false);

  const likeController = () => {
    if (!recipe?.id) return;
    setIsLiked(!isLiked);
    if (!isLiked) {
      likeRecipe(recipe.id);
    } else {
      unlikeRecipe(recipe.id);
    }
  };

  useEffect(() => {
    if (!isLikedData) return;
    if (isLikedData.liked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isLikedData]);

  useEffect(() => {
    setIsLiked(false);
  }, [isLikedError]);

  useEffect(() => {
    if (!likeError) return;
    setIsLiked(false);
  }, [likeError]);

  useEffect(() => {
    if (!unlikeError) return;
    setIsLiked(true);
  }, [unlikeError]);

  useEffect(() => {
    if (!recipe) return;
    getIsLiked(recipe.id);
  }, [recipe]);

  return isRecipeError ? (
    <Typography>Error</Typography>
  ) : isRecipeLoading || !recipe ? (
    <h1>is loading</h1>
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
            <Image sx={{ aspectRatio: { xs: "4/3", md: "initial" }, height: "100%" }} src={recipe.mainImageUrl || ""} />
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
        <Grid xs={12} item>
          <MyCard>
            <Typography sx={{ maxWidth: 600, whiteSpace: "break-spaces" }} variant="h6" component="pre">
              {recipe.text}
            </Typography>
          </MyCard>
        </Grid>
        {recipe.images.length > 0 && (
          <Grid xs={12} item>
            <Dialog fullScreen onClick={() => setSelectedURL(null)} open={!!selectedURL}>
              <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Image
                  sx={{ maxHeight: "90%", flex: 1, maxWidth: "90%", aspectRatio: "3/2" }}
                  src={selectedURL || ""}
                />
              </Box>
            </Dialog>
            <Carousel
              navigation
              slidesPerView={matches ? 4 : 2}
              spaceBetween={15}
              sx={{ width: "100%", slidesPerView: { xs: 2, md: 4 }, aspectRatio: { xs: "8/3", md: "16/3" } }}
            >
              {recipe.images.map((image) => (
                <SwiperSlide key={image.id} onClick={() => setSelectedURL(image.imageUrl)}>
                  <Image sx={{ userSelect: "none", width: "100%", height: "100%", zIndex: 100 }} src={image.imageUrl} />
                </SwiperSlide>
              ))}
            </Carousel>
          </Grid>
        )}
        <Grid item xs={12}>
          <MyCard>
            <Stack>
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
                  <IconButton onClick={likeController} size={"small"}>
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
                created: {formatDate(recipe.createdAt)}
                <ClientLink sx={{ marginLeft: "auto" }} to={`users/${recipe.author.id}`}>
                  <UserInfo reversed avatarSize={40} hideEmail user={recipe.author} />
                </ClientLink>
              </Box>
            </Stack>
          </MyCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Recipe;
