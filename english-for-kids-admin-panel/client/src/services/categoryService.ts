import pathsConstants from '../constants/pathsConstants';

const {
  BASIC_URL,
  CATEGORY,
} = pathsConstants;

export interface Category {
  _id?: string;
  title: string;
  words: number;
  __v: number;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(BASIC_URL + CATEGORY);
  const text = await res.text();
  const json = `[${text.replaceAll('}', '},').slice(0, -1)}]`;

  return JSON.parse(json);
};

export const createCategories = () => {

};
