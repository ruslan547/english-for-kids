import {
  MouseEvent, MutableRefObject, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Repeat from '../../../components/Repeat/Repeat';
import pathsConstants from '../../../constants/pathsConstants';
import routesConstants from '../../../constants/routesConstants';
import stateConstants from '../../../constants/stateConstants';
import { Card } from '../../../db/cards';
import { incrementError, incrementPlay, incrementTrain } from '../../../services/statisticsService';
import { playAudio } from '../../../services/audioService';
import { addGoal, addMiss, setErrNum } from '../ScoreBoard/scoreBoardSlice';
import { popWord, setCurrentWord, stopGame } from '../StartBtn/startBtnSlice';
import './CardElem.scss';

const { ASSETS_DIR, CORRECT_SOUND, ERROR_SOUND } = pathsConstants;

export interface CardElemProps {
  card: Card,
  listRef: MutableRefObject<HTMLUListElement | null>;
}

function CardElem({
  card: {
    word, translation, image, audioSrc,
  },
  listRef,
}: CardElemProps): JSX.Element {
  const [cardClass, setCardClass] = useState('card');
  const [completed, setCompleted] = useState(false);

  const dispatch = useAppDispatch();
  const { appState } = useAppSelector((state) => state.toggleSwitch);
  const { currentWord, words, isGame } = useAppSelector((state) => state.startBtn);
  const { score } = useAppSelector((state) => state.scoreBoard);
  const history = useHistory();

  const isPlay = appState === stateConstants.PLAY;

  const style = {
    backgroundImage: `url(${ASSETS_DIR}/${image})`,
    opacity: completed ? '.5' : '1',
  };

  const handleMouseOut = ({ target }: Event): void => {
    if ((target as HTMLElement).classList.contains('card-list')) {
      listRef.current?.removeEventListener('mouseover', handleMouseOut);
      setCardClass('card');
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    listRef.current?.addEventListener('mouseover', handleMouseOut);
    setCardClass('card flipped');
  };

  const handleCardClick = (): void => {
    if (cardClass === 'card' && !isPlay) {
      playAudio(audioSrc);
      incrementTrain(word);
    } else if (!completed && isPlay && isGame) {
      if (currentWord === audioSrc) {
        playAudio(CORRECT_SOUND);
        dispatch(addGoal());
        setCompleted(true);
        incrementPlay(word);

        if (words.length) {
          const curWord = words[words.length - 1];

          dispatch(setCurrentWord(curWord));
          dispatch(popWord());
          setTimeout(() => playAudio(curWord), 1000);
        } else {
          const errors = score.filter((item) => item === stateConstants.MISS);

          setTimeout(() => {
            dispatch(stopGame());
            dispatch(setErrNum(errors.length));
            history.push(routesConstants.FINISH);
          }, 1000);
        }
      } else {
        playAudio(ERROR_SOUND);
        dispatch(addMiss());
        incrementError(word);
      }
    }
  };

  useEffect(() => {
    if (!isGame) {
      setCompleted(false);
    }
  });

  return (
    <li className={`${cardClass} ${isPlay ? ' play' : ''}`} onClick={handleCardClick} onKeyDown={() => { }}>
      <div className="card__front" style={style}>
        <div className="card__word">{word}</div>
        <button className="card__btn" type="button" onClick={handleClick}>
          <Repeat />
        </button>
      </div>
      <div className="card__back" style={style}>
        <div className="card__word">{translation}</div>
      </div>
    </li>
  );
}

export default CardElem;
