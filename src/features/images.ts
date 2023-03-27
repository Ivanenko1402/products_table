import { createSlice } from "@reduxjs/toolkit";

type DefaultState = {
  images: string[],
}

const initialState: DefaultState = {
  images: [],
}

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImages: (state, { payload }) => {
      state.images = payload;
    }
  }
})

export const { setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
