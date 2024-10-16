import { Avatar, Box, Skeleton, Typography, useTheme } from "@mui/material";
import { User } from "../app/types";

type Props = {
  user: User | undefined;
};

const UserInfo = ({ user }: Props) => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
        <Avatar
          sx={{
            border: `2px solid ${theme.palette.mode === "dark" ? "white" : theme.palette.primary.main}`,
            width: 60,
            height: 60,
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
      {user?.email ? (
        <Typography
          sx={{ mt: 1, wordWrap: "break-word", overflowWrap: "break-word", fontSize: { xs: 18, md: 22 } }}
          variant="h4"
        >
          {user?.email}
        </Typography>
      ) : (
        <Skeleton sx={{ width: 200, height: { xs: 30, md: 36 } }} animation="wave" />
      )}
    </Box>
  );
};

export default UserInfo;
