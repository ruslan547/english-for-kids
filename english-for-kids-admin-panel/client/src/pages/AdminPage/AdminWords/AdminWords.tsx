import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, getCards } from '../../../services/wordsService';
import WordAdding from './WordAdding/WordAdding';
import WordCard from './WordCard/WordCard';
import settingNumConstants from '../../../constants/settingNumConstants';

const {
  PAGE_LIMIT,
  PAGE_LIMIT_INIT,
} = settingNumConstants;

function AdminWords(): JSX.Element {
  const { id } = useParams<{ [key: string]: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const ul = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);

  const addCards = async (num: number) => {
    const data = await getCards(num, page ? PAGE_LIMIT : PAGE_LIMIT_INIT, id);

    setCards((prevState) => [...prevState, ...data]);
  };

  const createCardList = () => cards.map(({
    _id, word, translation, image, audio, category,
  }) => (
    <WordCard
      key={_id}
      id={_id}
      word={word}
      category={category}
      translation={translation}
      image={image}
      audio={audio}
      setCards={setCards}
    />
  ));

  const nextPage = (): void => {
    if (ul && ul.current) {
      if (ul.current.scrollTop + ul.current.clientHeight >= ul.current.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleScroll = () => {
    nextPage();
  };

  useEffect(() => {
    addCards(page);
  }, [page]);

  useEffect(() => {
    nextPage();
  }, []);

  return (
    <ul className="admin-categories" ref={ul} onScroll={handleScroll}>
      {createCardList()}
      <WordAdding setCards={setCards} />
    </ul>
  );
}

export default AdminWords;
