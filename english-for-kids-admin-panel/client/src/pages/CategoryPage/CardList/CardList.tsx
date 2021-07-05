import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import contentConstants from '../../../constants/contentConstants';
import settingNumConstants from '../../../constants/settingNumConstants';
import { cards, categories } from '../../../db/cards';
import { getCalculatedDate } from '../../../services/statisticsService';
import CardElem from '../CardElem/CardElem';
import { setDifficultWords } from '../categoryPageSlice';
import './CardList.scss';

const { INDEX_OF_CATEGORY_PATH, INDEX_OF_CATEGORY_TITLE, MENU_ITEM_NUM } = settingNumConstants;

function CardList(): JSX.Element {
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLUListElement | null>(null);
  const { id } = useParams<{ id: string }>();

  const curCategory = categories.find((item) => item[INDEX_OF_CATEGORY_PATH].includes(`/${id}`));
  const categoryTitle = curCategory
    ? curCategory[INDEX_OF_CATEGORY_TITLE]
    : contentConstants.DIFFICULT_WORDS;

  let list;

  if (id) {
    const listIndex = categories.map((item) => item[INDEX_OF_CATEGORY_PATH]).indexOf(`/${id}`);
    list = cards[listIndex].map((item) => (
      <CardElem
        key={item.word}
        card={item}
        listRef={listRef}
      />
    ));
  } else {
    const statistics = getCalculatedDate();

    const difficultCards = statistics
      .sort((a, b) => b.statistic.error - a.statistic.error)
      .filter(({ statistic: { error } }, index) => error && index < MENU_ITEM_NUM)
      .map(({ card }) => card);

    list = difficultCards.map((card) => (
      <CardElem
        key={card.word}
        card={card}
        listRef={listRef}
      />
    ));

    dispatch(setDifficultWords(difficultCards));
  }

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
