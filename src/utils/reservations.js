const RESERVATIONS_KEY = "flightReservations";

function readReservations() {
  try {
    const savedReservations = localStorage.getItem(RESERVATIONS_KEY);

    return savedReservations
      ? JSON.parse(savedReservations)
      : [];
  } catch {
    return [];
  }
}

function saveReservations(reservations) {
  localStorage.setItem(
    RESERVATIONS_KEY,
    JSON.stringify(reservations)
  );
}

export function saveReservation(reservation) {
  const reservations = readReservations();

  const updatedReservations = [
    reservation,
    ...reservations,
  ];

  saveReservations(updatedReservations);

  return reservation;
}

export function getUserReservations(userId) {
  return readReservations()
    .filter((reservation) => reservation.userId === userId)
    .sort(
      (firstReservation, secondReservation) =>
        new Date(secondReservation.createdAt) -
        new Date(firstReservation.createdAt)
    );
}

export function getUserReservation(userId, reservationId) {
  return readReservations().find(
    (reservation) =>
      reservation.userId === userId &&
      reservation.id === reservationId
  );
}
