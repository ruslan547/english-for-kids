import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import './StartBtn.scss';
import stateConstants from '../../../constants/stateConstants';
import { setCurrentWord, setWords, startGame } from './startBtnSlice';
import { getAudios, getAudioFromDifficultCards } from '../../../services/audioService';
import pathsConstants from '../../../constants/pathsConstants';
import contentConstants from '../../../constants/contentConstants';
import { CalculatedDate, getCalculatedDate, isDifficultWords } from '../../../services/statisticsService';

function StartBtn(): JSX.Element {
  const dispatch = useAppDispatch();
  const { allCards, categories } = useAppSelector((state) => state.categoryPage);
  const { isGame, currentWord } = useAppSelector((state) => state.startBtn);
  const { appState } = useAppSelector((state) => state.toggleSwitch);
  const { difficultWords, cards } = useAppSelector((state) => state.categoryPage);
  const { id } = useParams<{ id: string }>();
  const isDisabled = appState === stateConstants.TRAIN
    || (!id && !isDifficultWords(allCards, categories));

  const playAudio = (audio: string): void => {
    new Audio(audio).play();
  };

  const handleClick = (): void => {
    if (!isGame) {
      let words;

      if (id) {
        words = getAudios(id, cards);
      } else {
        const statistics: CalculatedDate[] = getCalculatedDate(allCards, categories);

        words = statistics
          .filter(({ statistic: { error } }) => error)
          .map(({ card: { audio } }) => audio);
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
