import { createSlice } from "@reduxjs/toolkit";

interface IItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const initialState: IItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
