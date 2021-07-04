import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StartBtnState {
  isGame: boolean;
  currentWord: string;
  words: string[];
}

const initialState: StartBtnState = {
  isGame: false,
  currentWord: '',
  words: [],
};

export const startBtnSlice = createSlice({
  name: 'startBtn',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGame = true;
    },
    stopGame: (state) => {
      state.isGame = false;
    },
    setCurrentWord: (state, action: PayloadAction<string>) => {
      state.currentWord = action.payload;
    },
    setWords: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload;
    },
    popWord: (state) => {
      state.words = state.words.slice(0, -1);
    },
  },
});

export const {
  startGame, stopGame, setCurrentWord, setWords, popWord,
} = startBtnSlice.actions;

export default startBtnSlice.reducer;
