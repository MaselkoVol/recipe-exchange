import { Avatar, Box, Skeleton, SxProps, Typography, useTheme } from "@mui/material";
import { User, UserShortInfo } from "../app/types";

type Props = {
  user: UserShortInfo | undefined;
  hideEmail?: boolean;
  sx?: SxProps;
  avatarSize?: number;
  centered?: boolean;
  reversed?: boolean;
};

const UserInfo = ({ user, reversed = false, hideEmail = false, sx, avatarSize = 60, centered = false }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: "flex",
          flexDirection: reversed ? "row-reverse" : "row",
          gap: 1,
          alignItems: centered ? "center" : "flex-end",
        }}
      >
        <Avatar
          sx={{
            border: `${avatarSize / 20}px solid ${
              theme.palette.mode === "dark" ? "white" : theme.palette.primary.main
            }`,
            width: avatarSize,
            height: avatarSize,
          }}
          alt={user?.name}
          src={user?.avatarUrl || ""}
        />
        <Box>
          {user?.name ? (
            <Typography sx={{ width: "100%", wordWrap: "break-word", fontSize: { xs: 20, md: 24 } }} component="h3">
              {user?.name}
            </Typography>
          ) : (
            <Skeleton sx={{ width: 150, height: { xs: 30, md: 36 } }} animation="wave" />
          )}
        </Box>
      </Box>

      {!hideEmail &&
        (user?.email ? (
          <Typography
            sx={{ mt: 1, wordWrap: "break-word", overflowWrap: "break-word", fontSize: { xs: 18, md: 22 } }}
            variant="h4"
          >
            {user?.email}
          </Typography>
        ) : (
          <Skeleton sx={{ width: 200, height: { xs: 30, md: 36 } }} animation="wave" />
        ))}
    </Box>
  );
};

export default UserInfo;
