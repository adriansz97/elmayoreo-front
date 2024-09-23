import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    setLogin: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
  }
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer