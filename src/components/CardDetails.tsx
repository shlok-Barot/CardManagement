import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GridViewIcon from "@mui/icons-material/GridView";

const CardDetails: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper
      className="bg-gray-50 rounded-lg p-4"
      style={{ backgroundColor: "#e8e8e8" }}
    >
      <Box
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <Box className="flex items-center gap-2 text-sky-500">
          <GridViewIcon fontSize="small" />
          <Typography className="font-medium">Card Details</Typography>
        </Box>
        <IconButton size="small">
          {expanded ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box className="mt-4 p-3 bg-white rounded-lg">
          <Typography variant="body2">
            Card details content goes here...
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
};
export default CardDetails;
