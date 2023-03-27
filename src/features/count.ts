import { createSlice } from "@reduxjs/toolkit";

type DefaultState = {
  count: number,
}

const initialState: DefaultState = {
  count: 10,
}

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCount: (state, { payload }) => {
      state.count = payload;
    }
  }
})

export const { setCount } = countSlice.actions;
export default countSlice.reducer;
