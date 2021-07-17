import './WordCard.scss';
import {
  ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import AdminBtn from '../../AdminBtn/AdminBtn';
import contentConstants from '../../../../constants/contentConstants';
import routesConstants from '../../../../constants/routesConstants';
import { Card, deleteCard, updateCard } from '../../../../services/wordsService';
import { useAppDispatch } from '../../../../app/hooks';
import { setLogin } from '../../../../components/Header/HamburgerMenu/hamburgerMenu';

const {
  ADMIN,
  WORDS,
} = routesConstants;

interface WordCardProps {
  id: string;
  word: string;
  translation: string;
  category: string;
  image: string;
  audio: string;
  setCards: Dispatch<SetStateAction<Card[]>>
}

function WordCard({
  id,
  word,
  translation,
  category,
  image,
  audio,
  setCards,
}: WordCardProps): JSX.Element {
  const firstWord = useRef('');
  const firstTranslation = useRef('');
  const history = useHistory();
  const [isUpdate, setUpdate] = useState(false);
  const [wordText, setWordText] = useState(word);
  const [translationText, setTranslationText] = useState(translation);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleClick = async ({ target }: MouseEvent): Promise<void> => {
    const { name } = target as HTMLButtonElement;

    if (name === 'update') {
      firstWord.current = wordText;
      firstTranslation.current = translationText;
      setUpdate((prevState) => !prevState);
    } else if (name === 'cancel') {
      setWordText(firstWord.current);
      setTranslationText(firstTranslation.current);
      firstWord.current = '';
      firstTranslation.current = '';
      setUpdate((prevState) => !prevState);
    } else if (name === 'create') {
      setLoading(true);

      try {
        if (formRef && formRef.current) {
          const data = (await updateCard(formRef.current, category, id)) as Card;
          setCards((prevState) => prevState.map((item: Card) => {
            if (item._id === data._id) {
              return data as Card;
            }

            return item;
          }));
        }
      } catch (err) {
        setWordText(firstWord.current);
        setTranslationText(firstTranslation.current);
        dispatch(setLogin(false));
      }

      setUpdate(false);
      setLoading(false);
    } else if (name === 'delete') {
      setLoading(true);

      try {
        await deleteCard(id);
        setCards((prevState) => prevState.filter(({ _id }) => _id !== id));
      } catch {
        dispatch(setLogin(false));
      }
    } else if (name === 'play') {
      const player = new Audio(audio);

      player.play();
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
    <li className="word-card">
      <button className="category-card__close" disabled={loading} type="button" name="delete" onClick={handleClick}>
        &times;
      </button>
      {
        isUpdate
          ? (
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
          ) : (
            <>
              <div>
                <span>Word:</span>
                <br />
                {wordText}
              </div>
              <div>
                <span>Translation:</span>
                <br />
                {translationText}
              </div>
              <div>
                <span>Audio:</span>
                <br />
                {audio ? `${audio.split('/').pop()?.substr(-10)} ` : ''}
                <AdminBtn name="play" content="play" onClick={handleClick} />
              </div>
              <div>
                <span>Image:</span>
                <img className="word-card__img" src={image} alt="" />
              </div>
            </>
          )
      }
      <div className="category-card__btns">
        {
          isUpdate
            ? (
              <>
                <span className="category-card__cancel">
                  <AdminBtn name="cancel" content="Cancel" onClick={handleClick} />
                </span>
                <AdminBtn name="create" content="Create" disabled={loading} onClick={handleClick} />
              </>
            )
            : (
              <AdminBtn name="update" content="Change" onClick={handleClick} />
            )
        }
      </div>
    </li>
  );
}

export default WordCard;
