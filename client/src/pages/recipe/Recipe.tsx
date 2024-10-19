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
import React, { useState } from "react";
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

type Props = {};

const Recipe = (props: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const colors = useColors();
  const params = useParams();
  const { data: recipe, isLoading, error } = useGetRecipeQuery(params.id || "");
  return error ? (
    <Typography>Error</Typography>
  ) : isLoading || !recipe ? (
    <h1>is loading</h1>
  ) : (
    <Container sx={{ my: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sx={{ display: { xs: "block", md: "none" } }} item>
          <MyCard>
            <Typography sx={{ fontWeight: 700 }} variant="h4" component="h1">
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
            <Typography sx={{ display: { xs: "none", md: "block" }, fontWeight: 700 }} variant="h4" component="h1">
              {recipe.title}
            </Typography>
            <Box>
              <MyLabel>Ingredients</MyLabel>
              <Typography sx={{ whiteSpace: "break-spaces" }} variant="h6" component="pre">
                {recipe.ingredients}
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
        <Grid xs={12} item>
          <Dialog fullScreen onClick={() => setSelectedURL(null)} open={!!selectedURL}>
            <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <Image sx={{ maxHeight: "90%", flex: 1, maxWidth: "90%", aspectRatio: "3/2" }} src={selectedURL || ""} />
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
                  <IconButton size={"small"}>
                    <FavoriteBorder sx={{ fontSize: 30 }} color="error" />
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
