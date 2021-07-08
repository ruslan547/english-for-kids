import { Dispatch, SetStateAction, useState } from 'react';
import { Card } from '../../../../services/wordsService';

interface WordAddingProps {
  setCards: Dispatch<SetStateAction<Card[]>>;
}

function WordAdding({ setCards }: WordAddingProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    // setLoading(true);

    // try {
    //   // const category = await createCard();

    //   setCategories((prevState) => [...prevState, category]);
    // } catch (err) {
    //   console.log(err);
    // }

    // setLoading(false);
  };

  return (
    <li className="word-card" onClick={handleClick} onKeyDown={() => { }}>
      <h3 className="category-card__title">Create new word</h3>
      <button type="button" className="category-card__adding-btn" disabled={loading}>
        +
      </button>
    </li>
  );
}

export default WordAdding;
