import React from "react";
import { Typography } from "@mui/material";

const Header = ({ title }) => (
  <Typography variant="h4" align="center" gutterBottom>
    {title}
  </Typography>
);

export default Header;
