import {
  ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState,
} from 'react';
import { Card, createCard } from '../../../../services/wordsService';
import AdminBtn from '../../AdminBtn/AdminBtn';
import pathsConstants from '../../../../constants/pathsConstants';
import './WordAdding.scss';

const {
  BASIC_URL,
  WORDS,
} = pathsConstants;

interface WordAddingProps {
  category: string;
  setCards: Dispatch<SetStateAction<Card[]>>;
}

function WordAdding({ category, setCards }: WordAddingProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [wordText, setWordText] = useState('');
  const [translationText, setTranslationText] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleClick = async (event: MouseEvent<HTMLElement>) => {
    const { name, tagName } = event.target as HTMLButtonElement;
    event.stopPropagation();

    if (name === 'create' && formRef.current) {
      setLoading(true);
      createCard(formRef.current, category)
        .then((data) => {
          setCards((prevCards) => [...prevCards, JSON.parse(data as string)]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setWordText('');
          setTranslationText('');
          setCreate(false);
          setLoading(false);
        });
    } else if (tagName === 'LI') {
      setCreate((prevState) => {
        if (!prevState) {
          return !prevState;
        }

        return prevState;
      });
    } else if (name === 'cancel') {
      setWordText('');
      setTranslationText('');
      setCreate(false);
    }
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    if (name === 'word') {
      setWordText(value);
    } else if (name === 'translation') {
      setTranslationText(value);
    }
  };

  return (
    <li
      className={`word-card ${!isCreate ? 'word-card__add' : ''}`}
      onClick={handleClick}
      onKeyDown={() => { }}
    >
      {
        isCreate
          ? (
            <>
              <form className="word-card__form" ref={formRef} action="" onSubmit={() => false}>
                <div>
                  <span>Word:</span>
                  <br />
                  <input type="text" required name="word" value={wordText} onChange={handleChange} />
                </div>
                <div>
                  <span>Translation:</span>
                  <input type="text" required name="translation" value={translationText} onChange={handleChange} />
                </div>
                <div>
                  <span>Image:</span>
                  <input type="file" required name="image" onChange={handleChange} />
                </div>
                <div>
                  <span>Audio:</span>
                  <input type="file" required name="audio" onChange={handleChange} />
                </div>
              </form>
              <div className="category-card__btns">
                <span className="category-card__cancel">
                  <AdminBtn name="cancel" content="Cancel" onClick={handleClick} />
                </span>
                <AdminBtn disabled={loading} name="create" content="Create" onClick={handleClick} />
              </div>
            </>
          ) : (
            <h3 className="category-card__title">Create new word</h3>
          )
      }
    </li>
  );
}

export default WordAdding;
