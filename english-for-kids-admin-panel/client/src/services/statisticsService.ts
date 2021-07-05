import settingConstants from '../constants/settingConstants';
import settingNumConstants from '../constants/settingNumConstants';
import { Card, cards, categories } from '../db/cards';

const { LOCAL_STORAGE_KEY } = settingConstants;

const { INDEX_OF_CATEGORY_TITLE } = settingNumConstants;

export interface Statistic {
  train: number;
  play: number;
  error: number;
}

export interface Statistics {
  [key: string]: Statistic;
}

export interface CalculatedDate {
  card: Card;
  category: string;
  statistic: Statistic;
  percent: number;
}

export const setStatisticsToLocalStore = (obj: Statistics) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj));
};

export const getStatisticsFromLocalStore = (): Statistics => {
  const obj = localStorage.getItem(LOCAL_STORAGE_KEY);

  return obj ? JSON.parse(obj as string) : {};
};

export const resetStatistics = (): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
};

export const getCalculatedDate = () => cards.reduce((ac, item, index) => {
  const statistics = getStatisticsFromLocalStore();

  item.forEach((card) => {
    const category = categories[index][INDEX_OF_CATEGORY_TITLE];
    const statistic = statistics[card.word]
      ? statistics[card.word]
      : { train: 0, play: 0, error: 0 };
    const { play, error } = statistic;
    const prePercent = ((play * 100) / (play + error));
    const percent = prePercent ? Math.round(prePercent) : 0;

    ac.push({
      card,
      category,
      statistic,
      percent,
    });
  });

  return ac;
}, [] as CalculatedDate[]);

export const initWord = (statistics: Statistics, word: string): void => {
  if (statistics[word] === undefined) {
    statistics[word] = { train: 0, play: 0, error: 0 };
  }
};

export const incrementTrain = (word: string): void => {
  const statistics = getStatisticsFromLocalStore();

  initWord(statistics, word);
  statistics[word].train += 1;
  setStatisticsToLocalStore(statistics);
};

export const incrementPlay = (word: string): void => {
  const statistics = getStatisticsFromLocalStore();

  initWord(statistics, word);
  statistics[word].play += 1;
  setStatisticsToLocalStore(statistics);
};

export const incrementError = (word: string): void => {
  const statistics = getStatisticsFromLocalStore();

  initWord(statistics, word);
  statistics[word].error += 1;
  setStatisticsToLocalStore(statistics);
};
