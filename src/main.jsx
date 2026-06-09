import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import WelcomeBlue from "./WelcomeBlue.jsx";

const pageTitles = {
  blue: "Welcome Blue",
  green: "Welcome Green",
};

const selectedTheme = import.meta.env.VITE_WELCOME_THEME ?? "blue";
document.title = pageTitles[selectedTheme] ?? pageTitles.blue;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <WelcomeBlue />
  </React.StrictMode>
);
