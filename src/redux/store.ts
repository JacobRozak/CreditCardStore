import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import creditCardSlice from "./Slices/creditCardSlice";
import TransferSlice from "./Slices/transferSlice"

export const store = configureStore({
  reducer: {
    creditCard: creditCardSlice,
    transferHistory: TransferSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
