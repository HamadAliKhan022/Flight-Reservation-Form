import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { getCurrentUser } from "../utils/auth";

const tripOptions = [
  {
    title: "One Way",
    eyebrow: "Simple journey",
    description:
      "Reserve a flight to your destination when you do not need a return booking.",
    path: "/reservation/one-way",
    buttonText: "Choose One Way",
    Icon: FlightTakeoffRoundedIcon,
  },
  {
    title: "Round Trip",
    eyebrow: "Complete travel plan",
    description:
      "Reserve both departure and return flights together for a smoother travel plan.",
    path: "/reservation/round-trip",
    buttonText: "Choose Round Trip",
    Icon: SyncAltRoundedIcon,
  },
];

export default function TripTypePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <Container
      maxWidth="lg"
      className="trip-page"
      sx={{ py: { xs: 4, md: 7 } }}
    >
      <Box className="trip-hero">
        <Box className="hero-orb hero-orb-one" />
        <Box className="hero-orb hero-orb-two" />

        <Chip
          icon={<FlightTakeoffRoundedIcon />}
          label="Flight booking portal"
          className="hero-chip"
        />

        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            mt: 2.5,
            maxWidth: 720,
            position: "relative",
          }}
        >
          Where would you like to go,{" "}
          {user?.name?.split(" ")[0] || "Traveller"}?
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            maxWidth: 620,
            position: "relative",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.8,
            fontSize: { xs: "1rem", md: "1.08rem" },
          }}
        >
          Choose your trip type first, then complete your passenger and flight details.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 3,
          mt: { xs: 3, md: 4 },
        }}
      >
        {tripOptions.map(
          ({
            title,
            eyebrow,
            description,
            path,
            buttonText,
            Icon,
          }) => (
            <Card
              key={title}
              className="trip-card"
              elevation={0}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box className="trip-card-top">
                  <Box className="trip-icon">
                    <Icon fontSize="large" />
                  </Box>

                  <Chip
                    label={eyebrow}
                    size="small"
                    className="option-chip"
                  />
                </Box>

                <Typography
                  variant="h4"
                  fontWeight={900}
                  sx={{ mt: 3 }}
                >
                  {title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1.2,
                    lineHeight: 1.8,
                    minHeight: { md: 86 },
                  }}
                >
                  {description}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ mt: 3.2, py: 1.4 }}
                  onClick={() => navigate(path)}
                >
                  {buttonText}
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </Box>

      <Box className="trust-row">
        <Stack direction="row" spacing={1.2} alignItems="center">
          <CheckCircleRoundedIcon color="success" />
          <Typography variant="body2">
            Easy reservation flow
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.2} alignItems="center">
          <SecurityRoundedIcon color="primary" />
          <Typography variant="body2">
            Form validation included
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.2} alignItems="center">
          <SupportAgentRoundedIcon color="secondary" />
          <Typography variant="body2">
            Helpful travel options
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}
