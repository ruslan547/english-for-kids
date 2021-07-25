import { createSlice } from '@reduxjs/toolkit';

export const hamburgerMenuSlice = createSlice({
  name: 'hamburgerMenu',
  initialState: {
    isMenu: false,
    isModal: false,
    isLogin: false,
  },
  reducers: {
    openMenu: (state) => {
      state.isMenu = true;
    },
    closeMenu: (state) => {
      state.isMenu = false;
    },
    openModal: (state) => {
      state.isModal = true;
    },
    closeModal: (state) => {
      state.isModal = false;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const {
  openMenu, closeMenu, openModal, closeModal, setLogin,
} = hamburgerMenuSlice.actions;

export default hamburgerMenuSlice.reducer;
