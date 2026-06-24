import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded";
import { getCurrentUser, logoutUser } from "../../utils/auth";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const isReservationPage = location.pathname.includes("/reservation");
  const isMyReservationsPage = location.pathname.includes(
    "/my-reservations"
  );

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const navButtonStyle = (isActive) => ({
    color: isActive ? "primary.main" : "text.secondary",
    backgroundColor: isActive
      ? "rgba(23, 105, 224, 0.09)"
      : "transparent",
    "&:hover": {
      backgroundColor: "rgba(23, 105, 224, 0.09)",
    },
  });

  return (
    <Box className="app-shell">
      <AppBar
        position="sticky"
        elevation={0}
        className="topbar"
      >
        <Toolbar disableGutters>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: 76,
            }}
          >
            <Box
              className="brand-lockup"
              onClick={() => navigate("/trip-options")}
              role="button"
              tabIndex={0}
            >
              <Box className="logo-mark">
                <FlightTakeoffRoundedIcon />
              </Box>

              <Box>
                <Typography className="brand-name">
                  SkyBook
                </Typography>

                <Typography className="brand-tagline">
                  Travel made simple
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                ml: { md: 5 },
                display: { xs: "none", md: "flex" },
              }}
            >
              <Button
                onClick={() => navigate("/trip-options")}
                sx={navButtonStyle(
                  location.pathname === "/trip-options"
                )}
              >
                Book Flight
              </Button>

              <Button
                onClick={() => navigate("/my-reservations")}
                sx={navButtonStyle(isMyReservationsPage)}
              >
                My Reservations
              </Button>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <Chip
                icon={<LuggageRoundedIcon />}
                label={
                  isMyReservationsPage
                    ? "My bookings"
                    : isReservationPage
                    ? "Flight reservation"
                    : "Travel dashboard"
                }
                variant="outlined"
                className="desktop-only-chip"
              />

              <Tooltip title={user?.email || ""}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  className="user-profile"
                >
                  <Avatar className="user-avatar">
                    {(user?.name || "T")
                      .charAt(0)
                      .toUpperCase()}
                  </Avatar>

                  <Box className="desktop-user-name">
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      lineHeight={1.2}
                    >
                      {user?.name || "Traveller"}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Account active
                    </Typography>
                  </Box>
                </Stack>
              </Tooltip>

              <Button
                variant="text"
                color="inherit"
                startIcon={<LogoutRoundedIcon />}
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
}
