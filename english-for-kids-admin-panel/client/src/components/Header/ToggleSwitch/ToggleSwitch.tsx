import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import stateConstants from '../../../constants/stateConstants';
import { setErrNum, setScore } from '../../../pages/CategoryPage/ScoreBoard/scoreBoardSlice';
import { setCurrentWord, setWords, stopGame } from '../../../pages/CategoryPage/StartBtn/startBtnSlice';
import './ToggleSwitch.scss';
import { play, train } from './toggleSwitchSlice';
import contentConstants from '../../../constants/contentConstants';

const { PLAY, TRAIN } = contentConstants;

function ToggleSwitch(): JSX.Element {
  const { appState } = useAppSelector((state) => state.toggleSwitch);
  const { isGame } = useAppSelector((state) => state.startBtn);
  const dispatch = useAppDispatch();
  const isTrain = appState === stateConstants.TRAIN;
  const action = isTrain ? play : train;

  const handleClick = (): void => {
    dispatch(action());

    if (isTrain && isGame) {
      dispatch(stopGame());
      dispatch(setScore([]));
      dispatch(setCurrentWord(''));
      dispatch(setWords([]));
      dispatch(setErrNum(0));
    }
  };

  return (
    // https://www.w3schools.com/howto/howto_css_switch.asp
    <label className="switch" htmlFor="switch__toggle">
      <input id="switch__toggle" type="checkbox" />
      <span className="switch__slider" onClick={handleClick} onKeyDown={() => { }}>
        {isTrain ? TRAIN : PLAY}
      </span>
    </label>
  );
}

export default ToggleSwitch;
