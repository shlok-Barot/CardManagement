import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box className="flex h-screen">
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box className="flex flex-col flex-grow">
        <Header onMenuClick={toggleSidebar} />
        <Box
          className="flex-grow overflow-auto bg-gray-100"
          style={{ padding: "11rex 35px" }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
