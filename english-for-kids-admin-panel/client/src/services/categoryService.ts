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

export const getCategories = async (
  page: number,
  limit: number,
): Promise<{ categories: Category[], count: string }> => {
  const res = await fetch(`${BASIC_URL + CATEGORY}?page=${page}&limit=${limit}`);
  const count = res.headers.get('X-Total-Count') as string;
  const categories = await res.json();

  return { categories, count };
};

export const getAllCategories = async (): Promise<{ categories: Category[], count: string }> => {
  const res = await fetch(`${BASIC_URL + CATEGORY}`);
  const count = res.headers.get('X-Total-Count') as string;
  const categories = await res.json();

  return { categories, count };
};

export const createCategory = async (title: string) => {
  const res = await fetch(BASIC_URL + CATEGORY, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ title }),
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
