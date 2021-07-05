import { createSlice } from '@reduxjs/toolkit';
import stateConstants from '../../../constants/stateConstants';

const { GOAL, MISS } = stateConstants;

interface ScoreBoardSliceState {
  score: string[];
  errNum: number;
}

const initialState: ScoreBoardSliceState = {
  score: [],
  errNum: 0,
};

export const scoreBoardSlice = createSlice({
  name: 'scoreBoard',
  initialState,
  reducers: {
    addGoal: (state) => {
      state.score.push(GOAL);
    },
    addMiss: (state) => {
      state.score.push(MISS);
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setErrNum: (state, action) => {
      state.errNum = action.payload;
    },
  },
});

export const {
  addGoal, addMiss, setScore, setErrNum,
} = scoreBoardSlice.actions;

export default scoreBoardSlice.reducer;
