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
import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, Send } from "@mui/icons-material";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import UnregisteredDialog from "../../components/UnregisteredDialog";
import { useOptimisticButton } from "../../hooks/useOptimisticButton";
import { useLazyIsAddedToFavoriteQuery, useToggleFavoriteMutation } from "../../app/services/favoriteApi";
import { useAddViewMutation } from "../../app/services/viewsApi";
import SelectedTags from "../../components/SelectedTags";
import { Navigation } from "swiper/modules";
import MyTextField from "../../components/UI/input/MyTextField";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";
import LoadingButton from "../../components/UI/LoadingButton";
import MyButton from "../../components/UI/MyButton";
import MultipleImagesSelect from "../createRecipe/MultipleImagesSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import { useCreateCommentMutation } from "../../app/services/commentApi";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import Form from "../../components/UI/Form";

type Props = {};

type CommentForm = {
  text: string;
  images?: File[];
};

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

  const [isCommentFieldOpen, setIsCommentFiledOpen] = useState(false);
  const [selectedCommentImages, setSelectedComemntImages] = useState<File[] | null>(null);
  const [createComment, { isLoading, isError }] = useCreateCommentMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentForm>();

  const onSubmit: SubmitHandler<CommentForm> = async (data) => {
    reset();
    setSelectedComemntImages(null);
    if (!recipe?.id) return;

    if (selectedCommentImages) {
      data.images = selectedCommentImages;
    }
    const formData = new FormData();
    formData.append("text", data.text);
    if (data.images && data.images.length) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    const res = await createComment({ data: formData, recipeId: recipe.id });

    if (res.error) {
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "error", text: "Something went wrong during comment creation" })
      );
    } else {
      dispatch(
        addToSnackBar({ livingTime: 2000, severity: "success", text: "You have successfully created comment." })
      );
    }
  };

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
          <Box sx={{ display: "flex", flexWrap: "wrap-reverse", gap: 2, mt: 1 }}>
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
            <Box sx={{ display: "flex", gap: 1, pl: 4, flexGrow: 1, alignItems: "center" }}>
              <ClientLink sx={{ ml: "auto" }} to={`users/${recipe.author.id}`}>
                <UserInfo reversed avatarSize={40} hideEmail user={recipe.author} />
              </ClientLink>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={4} sx={{ pt: 2 }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Typography variant={"h4"} sx={{ color: colors.contrast }}>
                  Comments
                </Typography>
                <TextFieldMultiline
                  {...register("text", {
                    required: "RecipeTextIsRequired",
                  })}
                  onClick={() => setIsCommentFiledOpen(true)}
                  fullWidth
                  isContrast
                  label="Write a comment"
                />
                <Stack
                  spacing={1}
                  sx={{
                    display: isCommentFieldOpen ? "flex" : "none",
                  }}
                >
                  <AnimatedAlert open={!!errors.text?.message} severity="error">
                    {errors.text?.message}
                  </AnimatedAlert>
                  <MyCard
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      columnGap: 8,
                      rowGap: 2,
                      alignItems: "flex-end",
                    }}
                  >
                    <MultipleImagesSelect
                      maxImages={5}
                      sx={{ flex: 1, width: "100%", alignSelf: { md: "stretch" } }}
                      selectedFiles={selectedCommentImages}
                      setSelectedFiles={setSelectedComemntImages}
                      inputText="Add images"
                    />
                    <Box
                      sx={{
                        ml: "auto",
                        display: "flex",
                        gap: 2,
                        justifyContent: "flex-end",
                      }}
                    >
                      <MyButton variant="text" onClick={() => setIsCommentFiledOpen(false)}>
                        Cancel
                      </MyButton>
                      <LoadingButton
                        onClick={(e) => {
                          if (!isAuth) {
                            e.preventDefault();
                            setLoginOpen(true);
                          }
                        }}
                        type="submit"
                        isLoading={isLoading}
                        variant="contained"
                      >
                        <Send sx={{ mt: 0.5, mb: -0.5, mx: 2 }} />
                      </LoadingButton>
                    </Box>
                  </MyCard>
                </Stack>
              </Stack>
            </Form>
          </Stack>
        </Grid>
      </Grid>

      <UnregisteredDialog open={loginOpen} setIsOpen={setLoginOpen} />
    </Container>
  );
};

export default Recipe;
