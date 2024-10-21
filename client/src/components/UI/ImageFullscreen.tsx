import { Box, Dialog } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Image from "./Image";

type Props = {
  selectedURL: string | null;
  setSelectedURL: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageFullscreen = ({ selectedURL, setSelectedURL }: Props) => {
  const [image, setImage] = useState<string | null>(selectedURL);
  useEffect(() => {
    if (selectedURL) {
      setImage(selectedURL);
    }
  }, [selectedURL]);
  return (
    <Dialog fullScreen onClick={() => setSelectedURL(null)} open={!!selectedURL}>
      <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <Image sx={{ maxHeight: "90%", flex: 1, maxWidth: "90%", aspectRatio: "3/2" }} src={image || ""} />
      </Box>
    </Dialog>
  );
};

export default ImageFullscreen;
