import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

type DefaultState = {
  products: Product[],
}

const initialState: DefaultState = {
  products: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },

    addProduct: (state, { payload }) => {
      state.products.push(payload);
    },

    deleteProduct: (state, { payload }) => {
      state.products = state.products.filter((product) => product.id !== payload.id)
    },
  }
})

export const { setProducts, deleteProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
