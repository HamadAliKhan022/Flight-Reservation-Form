import { Navigate, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { getCurrentUser } from "../utils/auth";
import { getUserReservation } from "../utils/reservations";

function DetailItem({ label, value }) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={800}
      >
        {label}
      </Typography>

      <Typography sx={{ mt: 0.4 }} fontWeight={700}>
        {value || "Not provided"}
      </Typography>
    </Box>
  );
}

export default function ReservationDetailsPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const reservation = getUserReservation(
    user?.id,
    reservationId
  );

  if (!reservation) {
    return <Navigate to="/my-reservations" replace />;
  }

  const formattedServices =
    reservation.extraServices?.length > 0
      ? reservation.extraServices
          .map((service) =>
            service
              .split("-")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ")
          )
          .join(", ")
      : "No extra services selected";

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={() => navigate("/my-reservations")}
        sx={{ mb: 3 }}
      >
        Back to My Reservations
      </Button>

      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          border: "1px solid rgba(23, 105, 224, 0.14)",
          borderRadius: 4,
          boxShadow:
            "0 18px 40px rgba(16, 53, 104, 0.09)",
        }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            color: "#ffffff",
            background:
              "linear-gradient(125deg, #092d67 0%, #1463d6 100%)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.72)",
              fontWeight: 800,
            }}
          >
            FLIGHT RESERVATION DETAILS
          </Typography>

          <Typography variant="h4" fontWeight={900} sx={{ mt: 0.8 }}>
            {reservation.departureCityLabel}
            {" → "}
            {reservation.destinationCityLabel}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            <Chip
              label={reservation.reservationNumber}
              sx={{
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.18)",
              }}
            />

            <Chip
              icon={<CheckCircleRoundedIcon />}
              label={reservation.status}
              sx={{
                color: "#ffffff",
                backgroundColor: "rgba(19, 168, 122, 0.85)",
              }}
            />
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h6" fontWeight={900}>
            Flight Information
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            <DetailItem
              label="Trip Type"
              value={reservation.tripType}
            />

            <DetailItem
              label="Travel Class"
              value={reservation.travelClass}
            />

            <DetailItem
              label="Departure Date"
              value={
                reservation.departureDate
                  ? dayjs(reservation.departureDate).format(
                      "DD MMMM YYYY"
                    )
                  : null
              }
            />

            <DetailItem
              label="Return Date"
              value={
                reservation.returnDate
                  ? dayjs(reservation.returnDate).format(
                      "DD MMMM YYYY"
                    )
                  : "Not applicable"
              }
            />
          </Box>

          <Typography
            variant="h6"
            fontWeight={900}
            sx={{ mt: 4.5 }}
          >
            Passenger Details
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            <DetailItem
              label="Passenger Name"
              value={reservation.fullName}
            />

            <DetailItem label="Age" value={reservation.age} />

            <DetailItem
              label="Email Address"
              value={reservation.email}
            />

            <DetailItem
              label="Phone Number"
              value={reservation.phone}
            />
          </Box>

          <Typography
            variant="h6"
            fontWeight={900}
            sx={{ mt: 4.5 }}
          >
            Additional Information
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Stack spacing={2.5}>
            <DetailItem
              label="Extra Services"
              value={formattedServices}
            />

            <DetailItem
              label="Special Assistance Request"
              value={
                reservation.specialRequest ||
                "No special assistance request"
              }
            />

            <DetailItem
              label="Uploaded Document"
              value={reservation.uploadedDocument}
            />

            <DetailItem
              label="Reservation Submitted On"
              value={dayjs(reservation.createdAt).format(
                "DD MMMM YYYY, hh:mm A"
              )}
            />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
