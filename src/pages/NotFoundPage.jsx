import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { isAuthenticated } from "../utils/auth";

export default function NotFoundPage() {
  const homePath = isAuthenticated()
    ? "/trip-options"
    : "/login";

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          fontWeight={900}
        >
          404
        </Typography>

        <Typography variant="h4" fontWeight={800}>
          Page Not Found
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1.5 }}>
          The page you are looking for does not exist.
        </Typography>

        <Button
          component={RouterLink}
          to={homePath}
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{ mt: 3 }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}
