import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import toggleSwitchReducer from '../components/Header/ToggleSwitch/toggleSwitchSlice';
import hamburgerMenuReducer from '../components/Header/HamburgerMenu/hamburgerMenu';
import startBtnReducer from '../pages/CategoryPage/StartBtn/startBtnSlice';
import scoreBoardReducer from '../pages/CategoryPage/ScoreBoard/scoreBoardSlice';
import categoryPageReducer from '../pages/CategoryPage/categoryPageSlice';

export const store = configureStore({
  reducer: {
    toggleSwitch: toggleSwitchReducer,
    hamburgerMenu: hamburgerMenuReducer,
    startBtn: startBtnReducer,
    scoreBoard: scoreBoardReducer,
    categoryPage: categoryPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
