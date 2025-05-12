import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000", // YouTube Red
      light: "#FF4D4D",
      dark: "#CC0000",
    },
    secondary: {
      main: "#282828", // YouTube Dark Gray
      light: "#404040",
      dark: "#1A1A1A",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F9F9F9",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: "none",
        },
      },
    },
  },
});
