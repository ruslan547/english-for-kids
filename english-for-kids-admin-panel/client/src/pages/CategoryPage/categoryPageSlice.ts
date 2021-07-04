import { createSlice } from '@reduxjs/toolkit';

export const categoryPageSlice = createSlice({
  name: 'categoryPage',
  initialState: {
    difficultWords: [],
  },
  reducers: {
    setDifficultWords: (state, action) => {
      state.difficultWords = action.payload;
    },
  },
});

export const { setDifficultWords } = categoryPageSlice.actions;

export default categoryPageSlice.reducer;
