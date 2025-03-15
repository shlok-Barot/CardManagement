import React, { cloneElement, Fragment } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TuneIcon from "@mui/icons-material/Tune";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/Image/Logo.png";

const SidebarContainer = styled(Drawer)({
  width: 250,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 250,
    backgroundColor: "#003A5D",
    color: "#fff",
    padding: "0px 20px",
  },
});
const LogoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
});
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      active: false,
    },
    {
      text: "Cards",
      icon: <CreditCardIcon />,
      active: true,
    },
    {
      text: "Transactions",
      icon: <TuneIcon />,
      active: false,
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      active: false,
    },
  ];
  const drawerContent = (
    <>
      <LogoContainer>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "215px",
            paddingBottom: "10px",
          }}
        />
        <Box fontSize={12} textAlign="center" className="text-gray-300">
          Software & Web Development <br /> Company - Umbraco Gold Partner
        </Box>
      </LogoContainer>
      <List>
        {menuItems.map((item) => (
          <Fragment key={item.text}>
            <ListItemButton
              sx={{
                padding: "10px 0",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "35px",
                }}
              >
                {cloneElement(item.icon, {
                  sx: {
                    color: item.active ? "#00A8E8" : "white",
                  },
                })}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: item.active ? "#00A8E8" : "white",
                }}
              />
              {item.active && (
                <ArrowForwardIcon
                  sx={{
                    color: "#00A8E8",
                    fontSize: "large",
                  }}
                />
              )}
            </ListItemButton>
            <Divider
              sx={{
                bgcolor: "#a3d9ee",
              }}
            />
          </Fragment>
        ))}
      </List>
      <Box
        sx={{
          flexGrow: 1,
        }}
      />
      <List>
        <ListItemButton>
          <ListItemIcon
            sx={{
              minWidth: "35px",
            }}
          >
            <ExitToAppIcon
              sx={{
                color: "white",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </>
  );
  return (
    <>
      {isMobile && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1300,
            color: "white",
            backgroundColor: "#003A5D",
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}
      <SidebarContainer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={onClose}
      >
        {drawerContent}
      </SidebarContainer>
    </>
  );
};
export default Sidebar;
