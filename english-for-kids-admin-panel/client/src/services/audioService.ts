import pathsConstants from '../constants/pathsConstants';
import settingNumConstants from '../constants/settingNumConstants';
import { Card } from './wordsService';

const { INDEX_OF_CATEGORY_PATH } = settingNumConstants;

export const playAudio = (audioSrc: string): void => {
  new Audio(audioSrc).play();
};

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getAudios = (id: string, cards: Card[]): string[] => {
  const audios = cards.map(({ audio }) => audio);

  shuffle(audios);

  return audios;
};

export const getAudioFromDifficultCards = (arr: Card[]) => {
  const audios = arr.map(({ audio }) => audio);

  shuffle(audios);

  return audios;
};
