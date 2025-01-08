import React from "react";
import { Typography, Box } from "@mui/material";

const Header = ({ title }) => (
  <Box
    sx={{
      background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)", 
      color: "#fff", 
      padding: "10px 20px",
      borderRadius: "12px",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)", 
      textAlign: "center",
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontWeight: 600, 
        fontSize: { xs: "1.3rem", sm: "1.6rem", md: "2rem" }, 
        letterSpacing: "2px", 
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
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
