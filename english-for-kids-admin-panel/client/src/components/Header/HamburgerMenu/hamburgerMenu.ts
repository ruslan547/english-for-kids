import { createSlice } from '@reduxjs/toolkit';

export const hamburgerMenuSlice = createSlice({
  name: 'hamburgerMenu',
  initialState: {
    isMenu: false,
  },
  reducers: {
    openMenu: (state) => {
      state.isMenu = true;
    },
    closeMenu: (state) => {
      state.isMenu = false;
    },
  },
});

export const { openMenu, closeMenu } = hamburgerMenuSlice.actions;

export default hamburgerMenuSlice.reducer;
