import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6500", // Buttons and label color
    },
    secondary: {
      main: "#1E3E62", // Input frame
    },
    background: {
      default: "#0B192C", // Background color
    },
    text: {
      primary: "#ffffffde", // Text and labels
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FF6500",
          color: "#ffffffde",
          "&:hover": {
            backgroundColor: "#FF6500", // Keep the same on hover
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: "#1E3E62",
          "&.Mui-focused": {
            borderColor: "#FF6500",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffffde", // Change label color to primary
          "&.Mui-focused": {
            color: "#FF6500", // Maintain primary color when focused
          },
        },
      },
    },
  },
});

export default theme;
