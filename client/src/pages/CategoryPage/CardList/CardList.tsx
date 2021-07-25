import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import contentConstants from '../../../constants/contentConstants';
import settingNumConstants from '../../../constants/settingNumConstants';
import { Category } from '../../../services/categoryService';
import { CalculatedDate, getCalculatedDate } from '../../../services/statisticsService';
import { Card, getAllCards, getCards } from '../../../services/wordsService';
import CardElem from '../CardElem/CardElem';
import { setAllCards, setCards, setDifficultWords } from '../categoryPageSlice';
import './CardList.scss';

const { INDEX_OF_CATEGORY_PATH, INDEX_OF_CATEGORY_TITLE, MENU_ITEM_NUM } = settingNumConstants;

function CardList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { cards, categories, allCards } = useAppSelector((state) => state.categoryPage);
  const listRef = useRef<HTMLUListElement | null>(null);
  const { id } = useParams<{ id: string }>();

  const initCards = async () => {
    const data = await getCards(0, 0, id);
    const allData = await getAllCards();

    dispatch(setCards(data.cards));
    dispatch(setAllCards(allData.cards));
  };

  let categoryTitle;
  let list;

  if (id) {
    list = cards.map((item: Card) => (
      <CardElem
        key={item._id}
        card={item}
        listRef={listRef}
      />
    ));

    categoryTitle = (categories as Category[]).find(({ _id }) => _id === id)?.title;
  } else {
    const statistics: CalculatedDate[] = getCalculatedDate(allCards, categories);

    const difficultCards = statistics
      .filter(({ statistic: { error } }) => error)
      .map(({ card }) => card);

    list = difficultCards.map((card) => (
      <CardElem
        key={card._id}
        card={card}
        listRef={listRef}
      />
    ));

    categoryTitle = contentConstants.DIFFICULT_WORDS;

    // dispatch(setDifficultWords(difficultCards));
  }

  useEffect(() => {
    initCards();
  }, [id]);

  return (
    <>
      <div className="category-title">{categoryTitle}</div>
      <ul className="card-list" ref={listRef}>
        {list.length ? list : contentConstants.NOT_DIFFICULT_WORDS}
      </ul>
    </>
  );
}

export default CardList;
