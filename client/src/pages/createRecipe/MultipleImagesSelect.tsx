import {
  Alert,
  Backdrop,
  Box,
  Dialog,
  IconButton,
  Input,
  Menu,
  Modal,
  Snackbar,
  Stack,
  SxProps,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { resizeImage } from "../../utils/functions/resizeImage";
import { fileToDataURL, fileToFileWithDataURL } from "../../utils/functions/fileToDataURL";
import Image from "../../components/UI/Image";
import MyButton from "../../components/UI/MyButton";
import InputFile from "../../components/UI/input/InputFile";
import { Close } from "@mui/icons-material";
import { type FileWithDataURL } from "../../utils/functions/fileToDataURL";
import AnimatedAlert from "../../components/UI/AnimatedAlert";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {
  selectedFiles: File[] | null;
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  allowedTypes?: string;
  inputText: string;
  maxImages?: number;
};

const MultipleImagesSelect = ({ maxImages, inputText, allowedTypes, selectedFiles, setSelectedFiles }: Props) => {
  const theme = useTheme();
  const isTouchScreen = useSelector((selector: RootState) => selector.touchScreen.isTouchScreen);
  const [imagesFileWithDataURL, setImagesFileWithDataURL] = useState<FileWithDataURL[] | null>(null);
  const [selectedURL, setSelectedURL] = useState<string | null>(null);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const styles: SxProps = {
    fontSize: 24,
    position: "absolute",
    top: 5,
    right: 5,
    bgcolor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "100%",
    color: "white",
    zIndex: 10,
  };
  if (!isTouchScreen) {
    styles.opacity = 0;
    styles.pointerEvents = "none";
    styles.transition = "opacity .2s ease";
  }

  useEffect(() => {
    if (!selectedFiles) {
      setImagesFileWithDataURL(null);
      return;
    }
    Promise.all(selectedFiles.map(fileToFileWithDataURL))
      .then(setImagesFileWithDataURL)
      .catch((e) => console.log(e));
  }, [selectedFiles]);

  useEffect(() => {
    if (!isLimitExceeded) return;

    setTimeout(() => setIsLimitExceeded(false), 2000);
  }, [isLimitExceeded]);

  // when file is selected, it appends to already selected file list
  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) {
      return;
    }
    if (maxImages && files.length + (selectedFiles?.length || 0) > maxImages) {
      setIsLimitExceeded(true);
      return;
    }
    try {
      const mappedFiles = Array.from(files).map((file) => resizeImage(file, 1080, 720, "image/jpeg"));
      const resizedFiles = await Promise.all(mappedFiles);
      if (selectedFiles) {
        setSelectedFiles([...resizedFiles, ...selectedFiles]);
        return;
      }
      setSelectedFiles(resizedFiles);
    } catch (error) {
      console.error(error);
      setSelectedFiles(null);
      return;
    }
  };

  const removeSelectedFile = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, fileWithDataURL: FileWithDataURL) => {
    e.stopPropagation();
    if (!selectedFiles) return;
    setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile !== fileWithDataURL.file));
  };

  return (
    <Stack spacing={1}>
      {imagesFileWithDataURL && (
        <Box
          sx={{
            mb: 1,
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          }}
        >
          {imagesFileWithDataURL.map((imageFileWithDataURL, idx) => (
            <Box
              onClick={(e) => setSelectedURL(imageFileWithDataURL.dataURL)}
              key={idx}
              sx={{
                border: `1px dashed ${theme.palette.mode === "dark" ? "white" : theme.palette.primary.main}`,
                position: "relative",
                "&:hover": {
                  ".icon-button": {
                    opacity: 1,
                    pointerEvents: "all",
                  },
                },
              }}
            >
              <Close onClick={(e) => removeSelectedFile(e, imageFileWithDataURL)} className="icon-button" sx={styles} />
              <Image
                draggable="false"
                src={imageFileWithDataURL.dataURL}
                sx={{ userSelect: "none", aspectRatio: "3/2" }}
              />
            </Box>
          ))}
          <Dialog fullScreen onClick={() => setSelectedURL(null)} open={!!selectedURL}>
            <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <Image sx={{ maxHeight: "90%", flex: 1, maxWidth: "90%", aspectRatio: "3/2" }} src={selectedURL || ""} />
            </Box>
          </Dialog>
        </Box>
      )}
      <InputFile multiple onChange={handleFilesSelect} accept={allowedTypes || ""}>
        {inputText}
      </InputFile>
      <AnimatedAlert open={isLimitExceeded} variant="standard" severity="error">
        Maximum 10 files
      </AnimatedAlert>
    </Stack>
  );
};

export default MultipleImagesSelect;
