import { useMemo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { getCurrentUser } from "../utils/auth";
import { getUserReservations } from "../utils/reservations";

export default function MyReservationsPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const reservations = useMemo(
    () => getUserReservations(user?.id),
    [user?.id]
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={900}>
            My Reservations
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.8 }}>
            View all flight reservations created from your account.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<FlightTakeoffRoundedIcon />}
          onClick={() => navigate("/trip-options")}
        >
          Book New Flight
        </Button>
      </Box>

      {reservations.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: "center",
            border: "1px solid rgba(23, 105, 224, 0.12)",
            borderRadius: 4,
            background:
              "linear-gradient(145deg, #ffffff, #f6f9ff)",
          }}
        >
          <Box
            sx={{
              width: 74,
              height: 74,
              display: "grid",
              placeItems: "center",
              mx: "auto",
              borderRadius: "50%",
              color: "primary.main",
              backgroundColor: "rgba(23, 105, 224, 0.10)",
            }}
          >
            <FlightTakeoffRoundedIcon sx={{ fontSize: 38 }} />
          </Box>

          <Typography variant="h5" fontWeight={900} sx={{ mt: 2 }}>
            No reservations yet
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1, maxWidth: 450, mx: "auto" }}
          >
            Your submitted flight reservations will appear here.
          </Typography>

          <Button
            component={RouterLink}
            to="/trip-options"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Reserve Your First Flight
          </Button>
        </Paper>
      ) : (
        <Stack spacing={2.5}>
          {reservations.map((reservation) => (
            <Card
              key={reservation.id}
              elevation={0}
              sx={{
                overflow: "hidden",
                border:
                  "1px solid rgba(23, 105, 224, 0.12)",
                borderRadius: 4,
                boxShadow:
                  "0 12px 28px rgba(16, 53, 104, 0.07)",
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={800}
                    >
                      RESERVATION REFERENCE
                    </Typography>

                    <Typography variant="h6" fontWeight={900}>
                      {reservation.reservationNumber}
                    </Typography>
                  </Box>

                  <Chip
                    icon={<CheckCircleRoundedIcon />}
                    label={reservation.status}
                    color="success"
                    variant="outlined"
                  />
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "1fr auto 1fr auto",
                    },
                    gap: { xs: 1.5, md: 2.5 },
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={700}
                    >
                      FROM
                    </Typography>

                    <Typography fontWeight={900} sx={{ mt: 0.3 }}>
                      {reservation.departureCityLabel}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                      color: "primary.main",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                    }}
                  >
                    →
                  </Typography>

                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={700}
                    >
                      TO
                    </Typography>

                    <Typography fontWeight={900} sx={{ mt: 0.3 }}>
                      {reservation.destinationCityLabel}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      textAlign: {
                        xs: "left",
                        md: "right",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Departure
                    </Typography>

                    <Typography fontWeight={800}>
                      {reservation.departureDate
                        ? dayjs(reservation.departureDate).format(
                            "DD MMM YYYY"
                          )
                        : "Not selected"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={reservation.tripType}
                      size="small"
                    />
                    <Chip
                      label={reservation.travelClass}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Stack>

                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() =>
                      navigate(
                        `/my-reservations/${reservation.id}`
                      )
                    }
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
