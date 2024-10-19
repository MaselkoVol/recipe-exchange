import { SxProps, Typography, TypographyProps } from "@mui/material";
import React from "react";
import { useColors } from "../../hooks/useColors";

type Props = TypographyProps;

const MyLabel = ({ children, sx }: Props) => {
  const colors = useColors();
  return (
    <Typography
      sx={{ mb: 0.5, fontWeight: 700, color: colors.palette.primary.main, ...sx }}
      variant="subtitle1"
      component="h2"
    >
      {children}
    </Typography>
  );
};

export default MyLabel;
