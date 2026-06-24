import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FlightIcon from "@mui/icons-material/Flight";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import {
  FormCheckbox,
  FormDatePicker,
  FormFileUpload,
  FormRadioGroup,
  FormSelect,
  FormTextField,
} from "../components/form";

import { getCurrentUser } from "../utils/auth";
import { saveReservation } from "../utils/reservations";

const cityOptions = [
  { value: "islamabad", label: "Islamabad, Pakistan" },
  { value: "lahore", label: "Lahore, Pakistan" },
  { value: "karachi", label: "Karachi, Pakistan" },
  { value: "dubai", label: "Dubai, UAE" },
  { value: "doha", label: "Doha, Qatar" },
  { value: "istanbul", label: "Istanbul, Türkiye" },
  { value: "london", label: "London, United Kingdom" },
];

const serviceOptions = [
  { value: "extra-baggage", label: "Extra Baggage" },
  { value: "window-seat", label: "Window Seat" },
  { value: "vegetarian-meal", label: "Vegetarian Meal" },
  { value: "priority-boarding", label: "Priority Boarding" },
];

const travelClassOptions = [
  { value: "economy", label: "Economy" },
  { value: "business", label: "Business" },
  { value: "first-class", label: "First Class" },
];

const getInitialValues = () => ({
  fullName: "",
  email: "",
  phone: "",
  age: "",
  departureCity: "",
  destinationCity: "",
  departureDate: null,
  returnDate: null,
  travelClass: "economy",
  extraServices: [],
  specialRequest: "",
  identityDocument: null,
  agreeTerms: false,
});

export default function ReservationPage() {
  const { tripType } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [latestReservation, setLatestReservation] =
    useState(null);

  const isRoundTrip = tripType === "round-trip";
  const isValidTripType =
    tripType === "one-way" || tripType === "round-trip";

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    trigger,
  } = useForm({
    mode: "onTouched",
    defaultValues: getInitialValues(),
  });

  const departureCity = watch("departureCity");
  const departureDate = watch("departureDate");

  useEffect(() => {
    if (departureCity) {
      trigger("destinationCity");
    }
  }, [departureCity, trigger]);

  useEffect(() => {
    if (isRoundTrip && departureDate) {
      trigger("returnDate");
    }
  }, [departureDate, isRoundTrip, trigger]);

  if (!isValidTripType) {
    return <Navigate to="/trip-options" replace />;
  }

  const getCityLabel = (value) => {
    return (
      cityOptions.find((city) => city.value === value)
        ?.label || value
    );
  };

  const onSubmit = (data) => {
    const generatedId =
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const reservationNumber = `SKY-${Date.now()
      .toString()
      .slice(-8)}`;

    const reservation = {
      id: generatedId,
      reservationNumber,
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      status: "Confirmed",
      tripType: isRoundTrip ? "Round Trip" : "One Way",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      departureCity: data.departureCity,
      destinationCity: data.destinationCity,
      departureCityLabel: getCityLabel(data.departureCity),
      destinationCityLabel: getCityLabel(
        data.destinationCity
      ),
      departureDate:
        data.departureDate?.format("YYYY-MM-DD") || null,
      returnDate: isRoundTrip
        ? data.returnDate?.format("YYYY-MM-DD") || null
        : null,
      travelClass: data.travelClass,
      extraServices: data.extraServices || [],
      specialRequest: data.specialRequest,
      uploadedDocument: data.identityDocument?.name || null,
      createdAt: new Date().toISOString(),
    };

    saveReservation(reservation);

    setLatestReservation(reservation);
    reset(getInitialValues());
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Flight Reservation
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.7 }}>
            Complete your information to reserve your flight.
          </Typography>
        </Box>

        <Chip
          icon={<FlightIcon />}
          label={isRoundTrip ? "Round Trip" : "One Way"}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 700, px: 1 }}
        />
      </Box>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper className="form-section" elevation={0}>
          <Typography variant="h6" fontWeight={800}>
            Passenger Details
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Box className="form-grid">
            <FormTextField
              name="fullName"
              control={control}
              label="Passenger Full Name"
              sx={{ gridColumn: { md: "span 2" } }}
              rules={{
                required: "Passenger full name is required",
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
              name="phone"
              control={control}
              label="Phone Number"
              type="tel"
              placeholder="+92 300 1234567"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9\s-]{10,16}$/,
                  message: "Enter a valid phone number",
                },
              }}
            />

            <FormTextField
              name="age"
              control={control}
              label="Age"
              type="number"
              inputProps={{ min: 1, max: 120 }}
              rules={{
                required: "Age is required",
                min: {
                  value: 1,
                  message: "Age must be at least 1",
                },
                max: {
                  value: 120,
                  message: "Enter a valid age",
                },
              }}
            />
          </Box>
        </Paper>

        <Paper className="form-section" elevation={0}>
          <Typography variant="h6" fontWeight={800}>
            Flight Information
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Box className="form-grid">
            <FormSelect
              name="departureCity"
              control={control}
              label="Flying From"
              options={cityOptions}
              rules={{
                required: "Please select your departure city",
              }}
            />

            <FormSelect
              name="destinationCity"
              control={control}
              label="Flying To"
              options={cityOptions}
              rules={{
                required: "Please select your destination city",
                validate: (value) =>
                  value !== getValues("departureCity") ||
                  "Destination city must be different",
              }}
            />

            <FormDatePicker
              name="departureDate"
              control={control}
              label="Departure Date"
              disablePast
              rules={{
                required: "Please select a departure date",
              }}
            />

            {isRoundTrip && (
              <FormDatePicker
                name="returnDate"
                control={control}
                label="Return Date"
                minDate={
                  departureDate
                    ? departureDate.add(1, "day")
                    : dayjs().add(1, "day")
                }
                rules={{
                  required:
                    "Return date is required for a round trip",
                  validate: (value) => {
                    if (!value || !departureDate) {
                      return true;
                    }

                    return (
                      value.isAfter(departureDate, "day") ||
                      "Return date must be after departure date"
                    );
                  },
                }}
              />
            )}

            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <FormRadioGroup
                name="travelClass"
                control={control}
                label="Travel Class"
                row
                options={travelClassOptions}
                rules={{
                  required: "Please select a travel class",
                }}
              />
            </Box>

            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <FormSelect
                name="extraServices"
                control={control}
                label="Extra Services"
                multiple
                options={serviceOptions}
                rules={{
                  validate: (value) =>
                    value.length <= 3 ||
                    "You can select up to 3 extra services",
                }}
              />
            </Box>
          </Box>
        </Paper>

        <Paper className="form-section" elevation={0}>
          <Typography variant="h6" fontWeight={800}>
            Additional Information
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Box className="form-grid">
            <FormTextField
              name="specialRequest"
              control={control}
              label="Special Assistance Request"
              placeholder="For example, wheelchair assistance or meal request"
              multiline
              rows={4}
              sx={{ gridColumn: { md: "span 2" } }}
              rules={{
                maxLength: {
                  value: 300,
                  message:
                    "Special request cannot exceed 300 characters",
                },
              }}
            />

            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <FormFileUpload
                name="identityDocument"
                control={control}
                label="Upload Passport or CNIC"
                accept=".pdf,.jpg,.jpeg,.png"
                rules={{
                  required:
                    "Please upload your passport or CNIC document",
                  validate: (file) => {
                    if (!file) {
                      return true;
                    }

                    return (
                      file.size <= 5 * 1024 * 1024 ||
                      "File size must be less than 5 MB"
                    );
                  },
                }}
              />
            </Box>

            <Box sx={{ gridColumn: { md: "span 2" } }}>
              <FormCheckbox
                name="agreeTerms"
                control={control}
                label="I confirm that the provided booking information is correct."
                rules={{
                  validate: (value) =>
                    value === true ||
                    "You must confirm the information before reserving",
                }}
              />
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            flexWrap: "wrap",
            mt: 3,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={() => reset(getInitialValues())}
          >
            Reset Form
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<CheckCircleRoundedIcon />}
          >
            Reserve Flight
          </Button>
        </Box>
      </Box>

      <Dialog
        open={Boolean(latestReservation)}
        onClose={() => setLatestReservation(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 900, pb: 1 }}>
          Reservation Confirmed
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              textAlign: "center",
              py: 1.5,
            }}
          >
            <CheckCircleRoundedIcon
              color="success"
              sx={{ fontSize: 62 }}
            />

            <Typography variant="h5" fontWeight={900} sx={{ mt: 1 }}>
              Your flight has been reserved!
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Reservation reference
            </Typography>

            <Chip
              label={latestReservation?.reservationNumber}
              color="primary"
              sx={{
                mt: 1,
                fontSize: "1rem",
                px: 1,
              }}
            />

            <Paper
              variant="outlined"
              sx={{
                mt: 3,
                p: 2,
                textAlign: "left",
                borderRadius: 3,
                backgroundColor: "rgba(23, 105, 224, 0.04)",
              }}
            >
              <Typography fontWeight={800}>
                {latestReservation?.departureCityLabel}
                {" → "}
                {latestReservation?.destinationCityLabel}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.7 }}
              >
                {latestReservation?.tripType} ·{" "}
                {latestReservation?.travelClass}
              </Typography>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={() => {
              setLatestReservation(null);
              navigate("/trip-options");
            }}
          >
            Book Another Flight
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate("/my-reservations")}
          >
            View My Reservations
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
