import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TripTypePage from "./pages/TripTypePage";
import ReservationPage from "./pages/ReservationPage";
import MyReservationsPage from "./pages/MyReservationsPage";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { isAuthenticated } from "./utils/auth";

function RootRedirect() {
  return (
    <Navigate
      to={isAuthenticated() ? "/trip-options" : "/login"}
      replace
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/trip-options"
            element={<TripTypePage />}
          />

          <Route
            path="/reservation/:tripType"
            element={<ReservationPage />}
          />

          <Route
            path="/my-reservations"
            element={<MyReservationsPage />}
          />

          <Route
            path="/my-reservations/:reservationId"
            element={<ReservationDetailsPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
