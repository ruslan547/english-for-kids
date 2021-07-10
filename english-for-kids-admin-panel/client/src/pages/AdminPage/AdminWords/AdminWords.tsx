import { useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Card, getCards } from '../../../services/wordsService';
import WordAdding from './WordAdding/WordAdding';
import WordCard from './WordCard/WordCard';
import settingNumConstants from '../../../constants/settingNumConstants';

const { WORDS_PAGE_LIMIT } = settingNumConstants;

function AdminWords(): JSX.Element {
  const { id } = useParams<{ [key: string]: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const initCards = async () => {
    const data = await getCards(page, WORDS_PAGE_LIMIT, id);

    setCards(data.cards);
    setCount(+data.count);
    setPage((prevPage) => prevPage + 1);
  };

  const nextCards = async () => {
    const data = await getCards(page, WORDS_PAGE_LIMIT, id);

    setCards((prevState) => [...prevState, ...data.cards]);
    setPage((prevPage) => prevPage + 1);
  };

  const createCardList = () => cards.map(({
    _id, word, translation, image, audio, category,
  }) => (
    <WordCard
      key={_id}
      id={_id as string}
      word={word}
      category={category}
      translation={translation}
      image={image}
      audio={audio}
      setCards={setCards}
    />
  ));

  const handleScroll = () => {
    if (
      cards.length < count
      && ulRef
      && ulRef.current
      && ulRef.current.scrollTop + ulRef.current.clientHeight >= ulRef.current.scrollHeight
    ) {
      nextCards();
    }
  };

  useEffect(() => {
    initCards();
  }, []);

  return (
    <ul className="admin-categories" ref={ulRef} onScroll={handleScroll}>
      {createCardList()}
      <WordAdding category={id} setCards={setCards} />
    </ul>
  );
}

export default AdminWords;
