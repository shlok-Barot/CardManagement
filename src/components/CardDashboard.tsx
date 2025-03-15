import React from "react";
import { Paper } from "@mui/material";
import CardTabs from "./CardTabs";
interface CardDashboardProps {
  onAddCard: () => void;
}
const CardDashboard: React.FC<CardDashboardProps> = ({ onAddCard }) => {
  return (
    <Paper elevation={1} className="rounded-lg overflow-hidden">
      <CardTabs onAddCard={onAddCard} />
    </Paper>
  );
};
export default CardDashboard;
