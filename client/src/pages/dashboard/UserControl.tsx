import { Delete, Edit, Logout } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import UserInfo from "../../components/UserInfo";
import { User } from "../../app/types";
import MyButton from "../../components/UI/MyButton";
import { useLogoutMutation } from "../../app/services/authApi";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { useColors } from "../../hooks/useColors";
import ActionSelect from "./ActionSelect";
import { addToSnackBar } from "../../features/snackbar/snackbarSlice";
import LoadingButton from "../../components/UI/LoadingButton";
import LoadingPage from "../loadingPage/LoadingPage";

type Props = {
  user: User | undefined;
};

const UserControl = ({ user }: Props) => {
  const dispatch = useDispatch();
  const colors = useColors();

  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const toggleLogout = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <UserInfo hideEmail avatarSize={40} user={user} />

      <Box
        sx={{
          p: 1,
          bgcolor: colors.bg,
          borderRadius: 2,
          display: "flex",
          maxWidth: { xs: "fit-content", sm: "fit-content", xl: "100%" },
          justifyContent: "flex-start",
          gap: 1,
          alignItems: "center",
        }}
      >
        <IconButton>
          <Edit />
        </IconButton>

        <IconButton onClick={toggleLogout}>
          <Logout sx={{ position: "relative", left: 2 }} />
        </IconButton>
        <Dialog sx={{ mx: "auto", maxWidth: 400 }} open={isLogoutOpen} onClose={toggleLogout} aria-labelledby="logout">
          <DialogTitle>Log out </DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to log out from your account?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <MyButton color="info" sx={{ m: 1 }} onClick={toggleLogout}>
              Cancel
            </MyButton>
            <LoadingButton
              isLoading={isLogoutLoading}
              sx={{ m: 1 }}
              variant="outlined"
              color="error"
              onClick={handleLogout}
              autoFocus
            >
              Log out
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <IconButton color="error">
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UserControl;
