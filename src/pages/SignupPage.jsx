import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { FormTextField } from "../components/form";
import { signUpUser } from "../utils/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const {
    control,
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    setSignupError("");

    const result = signUpUser(data);

    if (!result.success) {
      setSignupError(result.message);
      return;
    }

    navigate("/login", { replace: true });
  };

  return (
    <Box className="auth-page">
      <Box className="auth-glow glow-one" />
      <Box className="auth-glow glow-two" />

      <Paper className="auth-card" elevation={0}>
        <Box className="auth-brand-row">
          <Box className="brand-icon">
            <FlightTakeoffRoundedIcon fontSize="large" />
          </Box>

          <Box>
            <Typography className="auth-brand-name">
              SkyBook
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Smart flight reservation
            </Typography>
          </Box>
        </Box>

        <Chip
          icon={<PersonAddAlt1RoundedIcon />}
          label="Create your travel account"
          className="welcome-chip"
        />

        <Typography
          variant="h4"
          fontWeight={900}
          sx={{ mt: 2.5 }}
        >
          Start your journey
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3.5, lineHeight: 1.7 }}
        >
          Create an account to reserve flights with SkyBook.
        </Typography>

        {signupError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {signupError}
          </Alert>
        )}

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "grid", gap: 2.2 }}
        >
          <FormTextField
            name="name"
            control={control}
            label="Full Name"
            autoComplete="name"
            rules={{
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Enter at least 3 characters",
              },
            }}
          />

          <FormTextField
            name="email"
            control={control}
            label="Email Address"
            type="email"
            autoComplete="email"
            rules={{
              required: "Email address is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            }}
          />

          <FormTextField
            name="password"
            control={control}
            label="Password"
            type="password"
            autoComplete="new-password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
            }}
          />

          <FormTextField
            name="confirmPassword"
            control={control}
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") ||
                "Passwords do not match",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 0.8, py: 1.35 }}
          >
            Create My Account
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <VerifiedUserOutlinedIcon
            fontSize="small"
            color="action"
          />

          <Typography variant="body2" color="text.secondary">
            Quick signup. No payment details required.
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 2.5 }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            fontWeight={800}
          >
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
