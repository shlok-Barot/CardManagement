import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import CardDetails from "./CardDetails";
import TransactionList from "./TransactionList";
import CardDisplay from "./CardDisplay";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RootState } from "../redux/store";
import { CardStateData, setDefaultCards } from "../redux/cardSlice";
import { v4 as uuidv4 } from "uuid";

interface CardDisplayProps {
  type: "credit" | "debit";
  cardNumber: string;
  cardHolder: string;
  validThru: string;
  cvv: string;
  showNumber?: boolean;
  isLock?: boolean;
  isArchive?: boolean;
}

const DefaultCardData: CardDisplayProps[] = [
  {
    type: "credit",
    cardNumber: "•••• •••• •••• 9340",
    cardHolder: "John Watson",
    validThru: "12/24",
    cvv: "***",
    isLock: false,
    isArchive: false,
  },
  {
    type: "debit",
    cardNumber: "•••• •••• •••• 4581",
    cardHolder: "John Watson",
    validThru: "09/26",
    cvv: "•••",
    showNumber: true,
    isLock: false,
    isArchive: false,
  },
];

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SavedCards: React.FC = () => {
  const dispatch = useDispatch();
  const [cardDetails, setCardDetails] = useState<CardStateData[]>([]);
  const cardData = useSelector((state: RootState) => state.card.cards);

  useEffect(() => {
    if (cardData.length === 0) {
      const formattedCards: CardStateData[] = DefaultCardData.map((card) => ({
        id: uuidv4(),
        name: card.cardHolder,
        bankName: "Unknown Bank",
        type: card.type,
        cardNumber: card.cardNumber,
        validTill: card.validThru,
        cvv: card.cvv,
        isDefault: false,
        addToGPay: false,
        isLock: false,
        isArchive: false,
      }));
      dispatch(setDefaultCards(formattedCards));
    }
    setCardDetails(cardData.length ? cardData : []);
  }, [cardData, dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Box className="space-y-4">
          <CardDetails />
          <TransactionList />
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          className="slider-container"
          sx={{
            position: "relative",
            display: "grid",
            "& .slick-slider": {
              display: "grid",
            },
          }}
        >
          <div>
            <Slider {...sliderSettings}>
              {cardDetails
                .filter((card) => card.type === "credit")
                .map((card, index) => (
                  <Box key={index} className="space-y-6">
                    <CardDisplay {...card} />
                  </Box>
                ))}
            </Slider>
          </div>
          <div style={{ marginTop: "25px" }}>
            <Slider {...sliderSettings}>
              {cardDetails
                .filter((card) => card.type === "debit")
                .map((card, index) => (
                  <Box key={index} className="space-y-6">
                    <CardDisplay {...card} />
                  </Box>
                ))}
            </Slider>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};
export default SavedCards;
