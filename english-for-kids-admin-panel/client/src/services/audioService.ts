import pathsConstants from '../constants/pathsConstants';
import settingNumConstants from '../constants/settingNumConstants';
import { Card, cards, categories } from '../db/cards';

const { INDEX_OF_CATEGORY_PATH } = settingNumConstants;

export const playAudio = (audioSrc: string): void => {
  new Audio(`${pathsConstants.ASSETS_DIR}/${audioSrc}`).play();
};

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const getAudioSrcs = (id: string): string[] => {
  const listIndex = categories.map((item) => item[INDEX_OF_CATEGORY_PATH]).indexOf(`/${id}`);
  const srcs = cards[listIndex].map(({ audioSrc }) => audioSrc);

  shuffle(srcs);

  return srcs;
};

export const getAudioFromDifficultCards = (arr: Card[]) => {
  const srcs = arr.map(({ audioSrc }) => audioSrc);

  shuffle(srcs);

  return srcs;
};
