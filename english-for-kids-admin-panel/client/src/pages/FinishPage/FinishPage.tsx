import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import pathsConstants from '../../constants/pathsConstants';
import routesConstants from '../../constants/routesConstants';
import { playAudio } from '../../services/audioService';
import { setErrNum } from '../CategoryPage/ScoreBoard/scoreBoardSlice';
import './FinishPage.scss';

function FinishPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { errNum } = useAppSelector((state) => state.scoreBoard);

  useEffect(() => {
    playAudio(`${pathsConstants.ASSETS_DIR}/audio/${errNum ? 'failure' : 'success'}.mp3`);
    setTimeout(() => {
      history.push(routesConstants.MAIN);
      dispatch(setErrNum(0));
    }, 3000);
  }, []);

  return (
    <div className="finish-page">
      <span className="finish-page__text">{errNum ? `${errNum} errors` : 'Win'}</span>
      <img src={`${pathsConstants.ASSETS_DIR}/img/${errNum ? 'failure' : 'success'}.jpg`} alt="" />
    </div>
  );
}

export default FinishPage;
