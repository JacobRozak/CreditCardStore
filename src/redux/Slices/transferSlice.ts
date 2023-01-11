import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Store } from "react-notifications-component";


export type transferDetails = {
  sender: number 
  receiver: number
  amount: number 
};

export interface TransferSliceState {
  transferItems: transferDetails[];
}

const initialState: TransferSliceState = {
  transferItems: []
};

export const transferSlice = createSlice({
  name: "transfer history",
  initialState,
  reducers: {
    addTransfer(state:TransferSliceState, action: PayloadAction<transferDetails>) {
      const input = action.payload;
      console.log(input)
      state.transferItems.push({
        ...input
      })
    }
  }
});

// selectors
export const selectTransfers = (state: RootState) => state.transferHistory;

export const {
  addTransfer
} = transferSlice.actions;
export default transferSlice.reducer;
