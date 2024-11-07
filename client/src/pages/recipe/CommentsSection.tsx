import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Form from "../../components/UI/Form";
import { useColors } from "../../hooks/useColors";
import TextFieldMultiline from "../../components/UI/input/TextFieldMultiline";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import MultipleImagesSelect from "../createRecipe/MultipleImagesSelect";
import MyButton from "../../components/UI/MyButton";
import LoadingButton from "../../components/UI/LoadingButton";
import MyCard from "../../components/UI/MyCard";
import { Recipe } from "../../app/types";
import { useCreateCommentMutation } from "../../app/services/commentApi";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import UnregisteredDialog from "../../components/UnregisteredDialog";
import { Send } from "@mui/icons-material";

type CommentForm = {
  text: string;
  images?: File[];
};

type Props = {
  recipe?: Recipe;
  isAuth: boolean;
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentsSection = ({ recipe, isAuth, setLoginOpen }: Props) => {
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
  const colors = useColors();
  return (
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
  );
};

export default CommentsSection;