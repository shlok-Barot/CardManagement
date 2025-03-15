import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import CardActions from "./CardActions";
import HDFCBank from "../../src/assets/Image/hdfc_Bank.png";
import MasterCard from "../../src/assets/Image/MasterCard_Logo.png";
import { CardStateData } from "../redux/cardSlice";
import LockIcon from "@mui/icons-material/Lock";
import ArchiveIcon from "@mui/icons-material/Archive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentImage from "../../src/assets/Image/GPay.png";

interface CardProps {
  isDefault: boolean | undefined;
  addToGPay: boolean | undefined;
  isLock: boolean | undefined;
  isArchive: boolean | undefined;
}

const CardDisplay: React.FC<CardStateData> = ({
  id,
  type,
  cardNumber,
  name,
  validTill,
  isDefault,
  addToGPay,
  isLock,
  isArchive,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isNumberVisible, setIsNumberVisible] = useState(false);
  const [isSelectedAction, setIsSelectedAction] = useState(false);

  useEffect(() => {
    if (isDefault || addToGPay || isLock || isArchive) {
      setIsSelectedAction(true);
    } else {
      setIsSelectedAction(false);
    }
  }, [isDefault, addToGPay, isLock, isArchive]);

  const toggleCardNumber = () => {
    setIsNumberVisible(!isNumberVisible);
  };

  const formatCardNumber = (number: string, isVisible: boolean) => {
    if (!isVisible) {
      return "•••• •••• •••• " + number.slice(-4);
    }
    return number.replace(/\d{4}(?=\d)/g, "$& ");
  };

  const getIcon = ({ isDefault, addToGPay, isLock, isArchive }: CardProps) => {
    if (isDefault) return <CheckCircleIcon fontSize="small" />;
    if (addToGPay)
      return <img src={PaymentImage} alt="GPay" width={24} height={24} />;
    if (isLock) return <LockIcon fontSize="small" />;
    if (isArchive) return <ArchiveIcon fontSize="small" />;
    return null;
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "#00AEFD",
            textDecoration: "underline",
          }}
        >
          {type === "credit" ? "Credit Cards" : "Debit Cards"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Button
          startIcon={
            isNumberVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
          }
          onClick={toggleCardNumber}
          size="small"
          sx={{
            textTransform: "none",
            background: "#92ddff",
            color: "#002b3f",
            "&:hover": { background: "#76c7ec" },
          }}
        >
          {isNumberVisible ? "Hide Card Number" : "Show Card Number"}
        </Button>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8} md={7}>
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              height: {
                xs: isMobile ? 190 : 175,
                sm: isMobile ? 180 : 200,
                md: 200,
              },
              width: "100%",
              maxWidth: 360,
              bgcolor:
                isDefault || addToGPay
                  ? "#00AEFD"
                  : isLock || isArchive
                  ? "#6e8c9f"
                  : "#0A3B5B",
              color: "white",
              p: { xs: 2, sm: 3 },
              mx: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: isSelectedAction ? "space-between" : "flex-end",
                mb: 2,
              }}
            >
              {getIcon({ isLock, isArchive, isDefault, addToGPay })}
              <img
                src={HDFCBank}
                alt="logo"
                style={{ width: 100, height: 20 }}
              />
            </Box>

            <Typography variant="h6" sx={{ mb: 1 }}>
              {name}
            </Typography>

            <Typography
              sx={{
                letterSpacing: 2,
                fontSize: { xs: "1rem", sm: "1.125rem" },
              }}
            >
              {formatCardNumber(cardNumber, isNumberVisible)}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <img
                src={MasterCard}
                alt="MasterCard"
                style={{ width: 50, height: 30 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" sx={{ color: "grey.300" }}>
                <Box
                  component="span"
                  sx={{ fontWeight: "bold", color: "#FFF" }}
                >
                  Valid Till:
                </Box>{" "}
                {validTill}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                style={{ paddingRight: isMobile ? "0" : "10rex" }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  CVV:
                </Box>
                <Box component="span" sx={{ fontSize: "18px" }}>
                  •••
                </Box>
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={5}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CardActions Id={id} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardDisplay;
