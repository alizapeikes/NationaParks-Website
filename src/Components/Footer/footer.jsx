import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import CssBaseline from "@mui/material/CssBaseline";

export const Footer = () => {
  return (
    <Box
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100%" }}
      elevation={3}
    >
      <CssBaseline />
      <BottomNavigation
        showLabels
        sx={{ backgroundColor: "#242B17", color: "white", height: "80%" }}
      >
        <div>© 2022 All Rights Reserved, AP</div>
      </BottomNavigation>
    </Box>
  );
};
