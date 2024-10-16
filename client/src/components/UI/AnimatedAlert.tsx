import { Alert, AlertProps, Box } from "@mui/material";
import React from "react";

type Props = AlertProps & {
  open: boolean;
  animationSpeed?: number;
};

const AnimatedAlert = ({ animationSpeed, open, children, ...rest }: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: `grid-template-rows ${animationSpeed ? animationSpeed + "s" : ".3s"} ease`,
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Alert {...rest}>{children}</Alert>
      </Box>
    </Box>
  );
};

export default AnimatedAlert;
