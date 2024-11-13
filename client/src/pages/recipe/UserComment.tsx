import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ClientLink from "../../components/UI/ClientLink";
import Image from "../../components/UI/Image";
import { useColors } from "../../hooks/useColors";
import { Comment } from "../../app/types";

type Props = {
  comment: Comment;
  setSelectedURL: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserComment = forwardRef<HTMLDivElement, Props>(({ comment, setSelectedURL }, ref) => {
  const colors = useColors();
  return (
    <Stack ref={ref} key={comment.id} direction={"row"} spacing={2}>
      <Avatar sx={{ width: 50, height: 50 }} src={comment.user.avatarUrl} />
      <Stack spacing={0.5}>
        <ClientLink to={`/users/${comment.user.id}`}>{comment.user.name}</ClientLink>
        <Typography>{comment.text}</Typography>
        {comment.images.length > 0 && (
          <Stack direction={"row"} spacing={1}>
            {comment.images.map((image, idx) => (
              <Box
                onClick={(e) => setSelectedURL(image.imageUrl)}
                key={idx}
                sx={{
                  width: 100,
                  border: `1px dashed ${colors.palette.mode === "dark" ? "white" : colors.palette.primary.main}`,
                  position: "relative",
                  "&:hover": {
                    ".icon-button": {
                      opacity: 1,
                      pointerEvents: "all",
                    },
                  },
                }}
              >
                <Image draggable="false" src={image.imageUrl} sx={{ userSelect: "none", aspectRatio: "3/2" }} />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
});

export default UserComment;