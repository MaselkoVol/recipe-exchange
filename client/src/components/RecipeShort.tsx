import { Box, Card, Chip, Typography } from "@mui/material";
import React from "react";
import { useColors } from "../hooks/useColors";
import Image from "./UI/Image";
import { hexToRGB } from "../utils/functions/colorFunctions";
import { Favorite, Visibility } from "@mui/icons-material";
import ClientLink from "./UI/ClientLink";
import MyButton from "./UI/MyButton";
import { RecipeShortInfo } from "../app/types";
import { formatDate } from "../utils/functions/formatDate";

type Props = {
  recipe: RecipeShortInfo;
};

const RecipeShort = ({ recipe }: Props) => {
  const colors = useColors();
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        bgcolor: colors.bg,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
      key={recipe.id}
    >
      <Typography variant="h5" component="h4">
        {recipe.title}
      </Typography>
      {recipe.mainImageUrl && (
        <Image
          sx={{
            my: 1,
            borderRadius: 1,
            overflow: "hidden",
            width: "100%",
            aspectRatio: "4/3",
          }}
          src={recipe.mainImageUrl}
        />
      )}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          gap: 1,
          overflow: "hidden",
        }}
      >
        {recipe.tags &&
          recipe.tags[0] &&
          recipe.tags.map((tag) => <Chip color={"primary"} label={tag.name} key={tag.id} />)}
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: 20,
            background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${hexToRGB(colors.bg)},1) 100%)`,
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {recipe.likesCount}
            <Favorite color="error" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {recipe.views}
            <Visibility />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: "auto" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            created: {formatDate(recipe.createdAt)}
          </Box>
          <ClientLink sx={{ flexShrink: 0, display: "inline-block" }} to={`/recipes/${recipe.id}`}>
            <MyButton variant="outlined">See more</MyButton>
          </ClientLink>
        </Box>
      </Box>
    </Card>
  );
};

export default RecipeShort;
