import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function WelcomeBlue() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0A2540 0%, #1565C0 50%, #42A5F5 100%)",
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
              background:
                "linear-gradient(90deg, #FFFFFF, #BBDEFB, #FFFFFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WELCOME TO BLUE
          </Typography>

          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              mb: 4,
            }}
          >
            A modern experience powered by elegant design and beautiful blue
            gradients.
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
                background: "#42A5F5",
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
