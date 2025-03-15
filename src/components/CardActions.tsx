import React, { useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ArchiveIcon from "@mui/icons-material/Archive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentImage from "../../src/assets/Image/GPay.png";
import { useDispatch, useSelector } from "react-redux";
import { updateCard } from "../redux/cardSlice";
import { RootState } from "../redux/store";

interface CardActionsProps {
  Id: string;
}

const initialCardListActions = [
  {
    icon: <LockIcon fontSize="small" />,
    label: "Lock Card",
    isSelected: false,
  },
  {
    icon: <ArchiveIcon fontSize="small" />,
    label: "Archive",
    isSelected: false,
  },
  {
    icon: <CheckCircleIcon fontSize="small" />,
    label: "Set As Default",
    isSelected: false,
  },
  {
    icon: <img src={PaymentImage} alt="GPay" width={24} height={24} />,
    label: "Add to GPay",
    isSelected: false,
  },
];

const CardActions: React.FC<CardActionsProps> = ({ Id }) => {
  const dispatch = useDispatch();
  const cardData = useSelector((state: RootState) => state.card.cards);

  const [cardListActions, setCardListActions] = useState(
    initialCardListActions
  );

  function updateCardById(
    cards: typeof cardData,
    id: string,
    key: "isDefault" | "addToGPay" | "isLock" | "isArchive"
  ) {
    return cards.map((card) =>
      card.id === id
        ? {
            ...card,
            isDefault: false,
            addToGPay: false,
            isLock: false,
            isArchive: false,
            [key]: true,
          }
        : card
    );
  }

  const handleSetCardActions = (CardId: string, action: string) => {
    let key: "isDefault" | "addToGPay" | "isLock" | "isArchive" | null = null;

    const updatedList = cardListActions.map((item) => ({
      ...item,
      isSelected: item.label === action,
    }));
    setCardListActions(updatedList);

    switch (action) {
      case "Set As Default":
        key = "isDefault";
        break;
      case "Add to GPay":
        key = "addToGPay";
        break;
      case "Lock Card":
        key = "isLock";
        break;
      case "Archive":
        key = "isArchive";
        break;
      default:
        key = null;
    }

    if (key) {
      const updatedCards = updateCardById(cardData, CardId, key);

      if (updatedCards) {
        const getUpdatedObj = updatedCards.findIndex((x) => x.id === CardId);

        if (getUpdatedObj !== -1) {
          dispatch(
            updateCard({
              id: CardId,
              ObjData: updatedCards[getUpdatedObj],
            })
          );
        }
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#D4EAF8",
        borderRadius: 2,
      }}
      style={{ width: "230px" }}
    >
      <Grid container spacing={2}>
        {cardListActions.map((action, index) => (
          <Grid item xs={6} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(14, 165, 233, 0.1)",
                  borderRadius: 2,
                },
              }}
              style={{ padding: "6px" }}
              onClick={() => handleSetCardActions(Id, action.label)}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: action.isSelected ? "#375262" : "#0EA5E9",
                  color: "#FFF",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 1,
                }}
              >
                {action.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "#333", fontWeight: "500", textAlign: "center" }}
              >
                {action.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CardActions;
