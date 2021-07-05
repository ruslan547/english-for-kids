import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './StartBtn.scss';
import stateConstants from '../../../constants/stateConstants';
import { setCurrentWord, setWords, startGame } from './startBtnSlice';
import { getAudioSrcs, getAudioFromDifficultCards } from '../../../services/audioService';
import pathsConstants from '../../../constants/pathsConstants';
import contentConstants from '../../../constants/contentConstants';

function StartBtn(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isGame, currentWord } = useAppSelector((state) => state.startBtn);
  const { appState } = useAppSelector((state) => state.toggleSwitch);
  const { difficultWords } = useAppSelector((state) => state.categoryPage);
  const { id } = useParams<{ id: string }>();
  const isDisabled = appState === stateConstants.TRAIN || (!id && !difficultWords.length);

  const playAudio = (audio: string): void => {
    new Audio(`${pathsConstants.ASSETS_DIR}/${audio}`).play();
  };

  const handleClick = (): void => {
    if (!isGame) {
      let words;

      if (id) {
        words = getAudioSrcs(id);
      } else {
        words = getAudioFromDifficultCards(difficultWords);
      }

      const curWord = words.pop() as string;

      dispatch(setCurrentWord(curWord));
      dispatch(setWords(words));
      dispatch(startGame());
      playAudio(curWord);
    } else {
      playAudio(currentWord);
    }
  };

  return (
    <div className="game-controller">
      <button
        className={`game-controller__btn ${isGame ? 'game-controller__btn_round' : ''}`}
        disabled={isDisabled}
        type="button"
        onClick={handleClick}
      >
        {
          isGame
            ? <img className="game-controller__img" src="/assets/img/repeat.svg" alt="" />
            : contentConstants.START_GAME
        }
      </button>
    </div>
  );
}

export default StartBtn;
