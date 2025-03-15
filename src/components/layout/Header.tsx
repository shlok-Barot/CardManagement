import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: "240px" },
        backgroundColor: "#F8FBFE",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        minHeight: "55px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        style={{ minHeight: "55px" }}
      >
        <Box display="flex" alignItems="center" onClick={onMenuClick}>
          {!isMobile && (
            <IconButton color="inherit" edge="start">
              <MenuIcon sx={{ color: "#5F8499", ml: "15px" }} />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#5F8499",
              ml: isMobile ? "50px" : 0,
            }}
          >
            Cards
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <AccountCircleIcon
            fontSize="large"
            sx={{ color: "#5F8499", fontSize: 30 }}
          />
          <KeyboardArrowDownIcon
            fontSize="small"
            sx={{ color: "#5F8499", fontSize: 20 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
