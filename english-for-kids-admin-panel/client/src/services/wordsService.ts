import pathsConstants from '../constants/pathsConstants';

const {
  BASIC_URL,
  WORDS,
} = pathsConstants;

export interface Card {
  _id?: string;
  word: string;
  translation: string;
  category: string;
  image: string;
  audio: string;
  __v: number;
}

export const getCards = async (
  page: number, limit: number,
  category: string,
): Promise<{ cards: Card[], count: string }> => {
  const res = await fetch(`${BASIC_URL + WORDS}?page=${page}&limit=${limit}&category=${category}`);
  const count = res.headers.get('X-Total-Count') as string;
  const cards = await res.json();

  if (res.ok) {
    return { cards, count };
  }

  throw new Error(cards.message);
};

export const createCard = async (
  form: HTMLFormElement,
  category: string,
) => new Promise((resolve, reject) => {
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', BASIC_URL + WORDS);
  xhr.responseType = 'json';
  formData.append('category', category);
  xhr.send(formData);

  xhr.onload = () => resolve(xhr.response);
  xhr.onerror = (err) => reject(err);
});

export const updateCard = async (
  form: HTMLFormElement,
  category: string,
  _id: string,
) => new Promise((resolve, reject) => {
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open('PATCH', BASIC_URL + WORDS);
  xhr.responseType = 'json';
  formData.append('_id', _id);
  formData.append('category', category);
  xhr.send(formData);

  xhr.onload = () => resolve(xhr.response);
  xhr.onerror = (err) => reject(err);
});

export const deleteCard = async (_id: string) => {
  const res = await fetch(BASIC_URL + WORDS, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id }),
  });

  const json = await res.json();

  return json;
};
