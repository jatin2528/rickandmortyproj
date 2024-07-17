import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import characterReducer from "../slices/characterSlice";
import characterSlice from "../slices/characterSlice";
const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
