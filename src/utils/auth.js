const USERS_KEY = "flightReservationUsers";
const SESSION_KEY = "flightReservationUser";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function getUsers() {
  return readStorage(USERS_KEY, []);
}

export function signUpUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  const alreadyExists = users.some(
    (user) => user.email === normalizedEmail
  );

  if (alreadyExists) {
    return {
      success: false,
      message: "An account already exists with this email address.",
    };
  }

  const newUser = {
    id:
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, newUser])
  );

  return {
    success: true,
    message: "Account created successfully. Please log in.",
  };
}

export function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = getUsers().find(
    (savedUser) =>
      savedUser.email === normalizedEmail &&
      savedUser.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email address or password.",
    };
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

  return {
    success: true,
    user: sessionUser,
  };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  return readStorage(SESSION_KEY, null);
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}
