import { useGetCurrentUserQuery } from "../../app/services/currentApi";
import { Box, Container, Grid, MenuItem, Select, useTheme } from "@mui/material";
import UserControl from "./UserControl";
import { Outlet } from "react-router-dom";
import ActionList from "./ActionList";
import ActionSelect from "./ActionSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: user, error, isLoading } = useGetCurrentUserQuery();
  const isTouchScreen = useSelector((selector: RootState) => selector.touchScreen.isTouchScreen);
  return (
    <Container sx={{ py: 3, flex: 1, display: "flex", width: "100%" }}>
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", sm: "7fr 5fr", xl: "3fr 5fr 4fr" },
          gridTemplateRows: { xs: "auto 1fr", sm: "1fr" },
        }}
      >
        <Box sx={{ gridColumn: { xs: 1, sm: 1, xl: 1 }, display: { xs: "none", xl: "block" } }}>
          <Box sx={{ position: "sticky", top: 87 }}>
            <ActionList user={user} />
          </Box>
        </Box>
        <Box
          sx={{
            gridColumn: { xs: 1, sm: 1, xl: 2 },
            gridRow: { xs: 2, sm: 1 },
            overflow: "hidden",
          }}
        >
          <ActionSelect user={user} sx={{ mb: 2, display: { xs: "block", sm: "none" } }} />
          <Outlet />
        </Box>
        <Box sx={{ gridColumn: { xs: 1, sm: 2, xl: 3 }, gridRow: { xs: 1, sm: 1 } }}>
          <Box
            sx={{
              overflow: "auto",
              display: { xs: "flex", sm: "block" },
              position: { xs: "static", sm: "sticky" },
              top: 87,
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              columnGap: 4,
              rowGap: 1,
            }}
          >
            <UserControl user={user} />
            <Box sx={{ mt: 2, display: { xs: "none", sm: "block", xl: "none" } }}>
              <ActionSelect sx={{ maxWidth: 250 }} variant="outlined" user={user} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
