import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardStateData {
  id: string;
  name: string;
  bankName: string;
  type: string;
  cardNumber: string;
  validTill: string;
  cvv: string;
  isDefault?: boolean;
  addToGPay?: boolean;
  isLock?: boolean;
  isArchive?: boolean;
}

interface CardState {
  cards: CardStateData[];
}

const initialState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardStateData>) => {
      state.cards.push(action.payload);
    },
    setDefaultCards: (state, action: PayloadAction<CardStateData[]>) => {
      state.cards = action.payload;
    },
    updateCard: (
      state,
      action: PayloadAction<{
        id: string;
        ObjData: CardStateData;
      }>
    ) => {
      const { id, ObjData } = action.payload;
      const index = state.cards.findIndex((card) => card.id === id);
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...ObjData };
      }
    },
  },
});

export const { addCard, setDefaultCards, updateCard } = cardSlice.actions;
export default cardSlice.reducer;
