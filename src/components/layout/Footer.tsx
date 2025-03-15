import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const Footer: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "9px",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#739bb3",
        height: "35px",
      }}
    >
      <Typography
        variant="body2"
        style={{ color: "#FFF", paddingLeft: isMobile ? "0" : "35rex" }}
      >
        &copy; 2022 GIRIRAJ DIGITAL All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
