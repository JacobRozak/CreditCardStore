import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type creditCardItem = {
    id: number
    issuer: string
    issuerDetails?: issuerDetails
    number: string
    name: string
    expiry: string
    cvc?: string
    balance: number
    pin:number
};

type issuerDetails = {
  id: number
  name: string
  cardStyle: string 
  limit: number 
  fee: number
}

export type transferDetails = {
  sender: number 
  receiver: number
  amount: number 
};

export interface CardSliceState {
  creditCardItems: creditCardItem[];
}

const initialState: CardSliceState = {
  creditCardItems: []
};

export const creditCardSlice = createSlice({
  name: "creditCard",
  initialState,
  reducers: {
    addCreditCard(state: CardSliceState, action: PayloadAction<creditCardItem>) {
      const input: creditCardItem = action.payload;
      state.creditCardItems.push({
        ...input
      })
    },
    initiateTransfer(state: CardSliceState, action: PayloadAction<transferDetails>) {
      const input: transferDetails = action.payload;
      const senderObject: creditCardItem | undefined = state.creditCardItems.find(obj => obj.id === input.sender);
      if (senderObject!.issuerDetails!.fee){
        const fee = senderObject!.issuerDetails!.fee % input.amount
        senderObject!.balance -= fee;
      }
      senderObject!.balance -= input.amount;
      const receiverObject: creditCardItem | undefined = state.creditCardItems.find(obj => obj.id === input.receiver);
      receiverObject!.balance += input.amount;
    },
  }
});

// selectors
export const selectCreditCard = (state: RootState) => state.creditCard;

export const {
  addCreditCard,
  initiateTransfer
} = creditCardSlice.actions;
export default creditCardSlice.reducer;
