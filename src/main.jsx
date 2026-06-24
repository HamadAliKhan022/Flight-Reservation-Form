import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "./App";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1769e0",
      dark: "#0b3f9d",
      light: "#e8f0ff",
    },
    secondary: {
      main: "#ff8a00",
      dark: "#d96e00",
    },
    success: {
      main: "#13a87a",
    },
    background: {
      default: "#f3f7fc",
      paper: "#ffffff",
    },
    text: {
      primary: "#14213d",
      secondary: "#667085",
    },
  },

  shape: {
    borderRadius: 18,
  },

  typography: {
    fontFamily:
      '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      letterSpacing: "-0.04em",
    },
    h4: {
      letterSpacing: "-0.035em",
    },
    h5: {
      letterSpacing: "-0.025em",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: "#f3f7fc",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 800,
          padding: "10px 18px",
          boxShadow: "none",
        },
        contained: {
          boxShadow: "0 12px 24px rgba(23, 105, 224, 0.20)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#ffffff",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#fbfdff",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(23, 105, 224, 0.10)",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 18,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 9,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
