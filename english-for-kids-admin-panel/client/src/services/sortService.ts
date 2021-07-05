import sortConstants from '../constants/sortConstants';
import { CalculatedDate } from './statisticsService';

const {
  CATEGORY,
  WORD,
  TRANSLATION,
  PLAY,
  TRAIN,
  ERROR,
} = sortConstants;

export const sortByCategory = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => (a.category > b.category ? 1 : -1));
};

export const sortByWord = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => (a.card.word > b.card.word ? 1 : -1));
};

export const sortByTranslation = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => (a.card.translation > b.card.translation ? 1 : -1));
};

export const sortByTrain = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => a.statistic.train - b.statistic.train);
};

export const sortByPlay = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => a.statistic.play - b.statistic.play);
};

export const sortByError = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => a.statistic.error - b.statistic.error);
};

export const sortByPercent = (arr: CalculatedDate[]): void => {
  arr.sort((a, b) => a.percent - b.percent);
};

export const sort = (arr: CalculatedDate[], sortBy: string): void => {
  switch (sortBy) {
    case CATEGORY:
      sortByCategory(arr);
      break;
    case WORD:
      sortByWord(arr);
      break;
    case TRANSLATION:
      sortByTranslation(arr);
      break;
    case TRAIN:
      sortByTrain(arr);
      break;
    case PLAY:
      sortByPlay(arr);
      break;
    case ERROR:
      sortByError(arr);
      break;
    default:
      sortByPercent(arr);
      break;
  }
};
