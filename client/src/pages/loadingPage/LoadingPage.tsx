import { Box, keyframes, styled } from "@mui/material";
import React from "react";
import { useColors } from "../../hooks/useColors";

type Props = {};

const l2 = keyframes`
  100% {box-shadow: 0 0 0 40px #0000}
`;

const CustomLoader = styled("div")(() => {
  const colors = useColors();
  return {
    width: 20,
    aspectRatio: 1,
    borderRadius: "50%",
    background: colors.palette.primary.main,
    boxShadow: `0 0 0 0 ${colors.palette.primary.light}`,
    animation: `${l2} 1.5s infinite linear`,
    position: "relative",
    "&::before": {
      content: '""', // This should be a string with double quotes
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      boxShadow: `0 0 0 0 ${colors.palette.primary.light}`,
      animation: `${l2} 1.5s infinite linear`, // Apply the same animation keyframes here
      animationDelay: "-0.5s",
    },
    "&::after": {
      content: '""', // This should be a string with double quotes
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      boxShadow: `0 0 0 0 ${colors.palette.primary.light}`,
      animation: `${l2} 1.5s infinite linear`, // Apply the same animation keyframes here
      animationDelay: "-1s",
    },
  };
});

const LoadingPage = (props: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
      <CustomLoader />
    </Box>
  );
};

export default LoadingPage;
