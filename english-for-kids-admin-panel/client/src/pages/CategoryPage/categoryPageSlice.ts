import { createSlice } from '@reduxjs/toolkit';

export const categoryPageSlice = createSlice({
  name: 'categoryPage',
  initialState: {
    difficultWords: [],
    cards: [],
    categories: [],
    allCards: [],
  },
  reducers: {
    setDifficultWords: (state, action) => {
      state.difficultWords = action.payload;
    },
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setAllCards: (state, action) => {
      state.allCards = action.payload;
    },
  },
});

export const {
  setDifficultWords,
  setCards,
  setCategories,
  setAllCards,
} = categoryPageSlice.actions;

export default categoryPageSlice.reducer;
