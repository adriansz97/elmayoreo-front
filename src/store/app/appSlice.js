import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'auth',
  initialState: {
    width: null,
    height: null,
  },
  reducers: {
    setWindowSize: (state, { payload }) => {
      state.width = payload.width;
      state.height = payload.height;
    },
  }
});

export const { setWindowSize } = appSlice.actions;

export default appSlice.reducer