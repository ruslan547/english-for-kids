import pathsConstants from '../constants/pathsConstants';
import settingNumConstants from '../constants/settingNumConstants';

const {
  BASIC_URL,
  WORDS,
} = pathsConstants;

export interface Card {
  _id: string;
  word: string;
  translation: string;
  category: string;
  image: string;
  audio: string;
  __v: number;
}

export const getCards = async (page: number, limit: number, category: string): Promise<Card[]> => {
  const res = await fetch(`${BASIC_URL + WORDS}?page=${page}&limit=${limit}&category=${category}`);
  const text = await res.text();
  const json = `[${text.replaceAll('}', '},').slice(0, -1)}]`;

  return JSON.parse(json);
};

// export const createCard = async () => {
//   const res = await fetch(BASIC_URL + CATEGORY, {
//     method: 'POST',
//   });

//   const json = await res.json();

//   return json;
// };

// export const updateCard = async (_id: string, title: string) => {
//   const res = await fetch(BASIC_URL + CATEGORY, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ _id, title }),
//   });

//   const json = await res.json();

//   return json;
// };

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
