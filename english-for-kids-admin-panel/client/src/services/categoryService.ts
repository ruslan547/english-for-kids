import pathsConstants from '../constants/pathsConstants';
import settingNumConstants from '../constants/settingNumConstants';

const {
  BASIC_URL,
  CATEGORY,
} = pathsConstants;

export interface Category {
  _id: string;
  title: string;
  words: number;
  __v: number;
}

export const getCategories = async (page: number, limit: number): Promise<Category[]> => {
  const res = await fetch(`${BASIC_URL + CATEGORY}?page=${page}&limit=${limit}`);
  const text = await res.text();
  const json = `[${text.replaceAll('}', '},').slice(0, -1)}]`;

  return JSON.parse(json);
};

export const createCategories = async () => {
  const res = await fetch(BASIC_URL + CATEGORY, {
    method: 'POST',
  });

  const json = await res.json();

  return json;
};

export const updateCategories = async (_id: string, title: string) => {
  const res = await fetch(BASIC_URL + CATEGORY, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, title }),
  });

  const json = await res.json();

  return json;
};

export const deleteCategory = async (_id: string) => {
  const res = await fetch(BASIC_URL + CATEGORY, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id }),
  });

  const json = await res.json();

  return json;
};
