import React, { useState } from "react";
import { Box, Tabs, Tab, Button, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import SavedCards from "./SavedCards";
import GDCards from "./GDCards";

interface CardTabsProps {
  onAddCard: () => void;
}

const CardTabs: React.FC<CardTabsProps> = ({ onAddCard }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <Box className="flex justify-between items-center border-b">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#0ea5e9",
              height: "3px",
            },
          }}
        >
          <Tab
            label="Saved Cards"
            className={
              value === 0 ? "text-sky-500 font-medium" : "text-gray-600"
            }
          />
          <Tab
            label="GD Cards"
            className={
              value === 1 ? "text-sky-500 font-medium" : "text-gray-600"
            }
          />
        </Tabs>
        <Button
          variant="contained"
          startIcon={!isSmallScreen ? <AddIcon /> : null}
          onClick={onAddCard}
          className="m-2 bg-sky-500 hover:bg-sky-600"
          sx={{
            width: { xs: "10%", sm: "auto" },
            fontSize: { xs: "0.75rem", sm: "1rem" },
            padding: { xs: "8px", sm: "10px 20px" },
            marginTop: { xs: "8px", sm: "0px" },
          }}
        >
          {isSmallScreen ? <AddIcon fontSize="small" /> : "Add Card"}
        </Button>
      </Box>
      <Box className="p-4">{value === 0 ? <SavedCards /> : <GDCards />}</Box>
    </Box>
  );
};
export default CardTabs;
