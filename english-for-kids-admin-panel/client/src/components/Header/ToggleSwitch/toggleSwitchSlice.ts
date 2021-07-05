import { createSlice } from '@reduxjs/toolkit';
import stateConstants from '../../../constants/stateConstants';

const {
  TRAIN,
  PLAY,
} = stateConstants;

export const toggleSwitchSlice = createSlice({
  name: 'toggleSwitch',
  initialState: {
    appState: TRAIN,
  },
  reducers: {
    play: (state) => {
      state.appState = PLAY;
    },
    train: (state) => {
      state.appState = TRAIN;
    },
  },
});

export const { play, train } = toggleSwitchSlice.actions;

export default toggleSwitchSlice.reducer;
