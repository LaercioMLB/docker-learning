import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const themes = {
  blue: {
    name: "BLUE",
    gradient: "linear-gradient(135deg, #0A2540 0%, #1565C0 50%, #42A5F5 100%)",
    titleGradient: "linear-gradient(90deg, #FFFFFF, #BBDEFB, #FFFFFF)",
    buttonColor: "#42A5F5",
    description:
      "A modern experience powered by elegant design and beautiful blue gradients.",
  },
  green: {
    name: "GREEN",
    gradient: "linear-gradient(135deg, #052E16 0%, #16803C 50%, #66BB6A 100%)",
    titleGradient: "linear-gradient(90deg, #FFFFFF, #C8E6C9, #FFFFFF)",
    buttonColor: "#43A047",
    description:
      "A modern experience powered by elegant design and beautiful green gradients.",
  },
};

export default function WelcomeBlue() {
  const selectedTheme = import.meta.env.VITE_WELCOME_THEME ?? "blue";
  const theme = themes[selectedTheme] ?? themes.blue;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 6,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "white",
        }}
      >
        <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 4,
              opacity: 0.8,
            }}
          >
            EXPERIENCE THE FUTURE
          </Typography>

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              mt: 2,
              mb: 2,
              fontSize: { xs: "2.6rem", sm: "3.75rem" },
              background: theme.titleGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WELCOME TO {theme.name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              mb: 4,
            }}
          >
            {theme.description}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: 999,
                px: 4,
                background: theme.buttonColor,
              }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 999,
                px: 4,
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
              }}
            >
              Learn More
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
