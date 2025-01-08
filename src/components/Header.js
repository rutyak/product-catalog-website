import React from "react";
import { Typography, Box } from "@mui/material";

const Header = ({ title }) => (
  <Box
    sx={{
      background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", // A modern gradient
      color: "#fff", // White text for contrast
      padding: "10px 20px",
      borderRadius: "12px", // More rounded corners for a smooth look
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)", // A subtle, elegant shadow
      textAlign: "center",
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontWeight: 600, // Bold for strong emphasis
        fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" }, // Responsive font size
        letterSpacing: "2px", // Slight spacing for a clean look
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Add depth to the text
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        fontSize: "1rem",
        fontWeight: 300,
        color: "rgba(255, 255, 255, 0.8)", 
      }}
    >
      Welcome to a world of possibilities
    </Typography>
  </Box>
);

export default Header;
