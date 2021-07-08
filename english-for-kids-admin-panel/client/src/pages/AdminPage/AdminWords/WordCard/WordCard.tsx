import './WordCard.scss';
import {
  ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import AdminBtn from '../../AdminBtn/AdminBtn';
import contentConstants from '../../../../constants/contentConstants';
import routesConstants from '../../../../constants/routesConstants';
import { Card } from '../../../../services/wordsService';

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

  const handleClick = async ({ target }: MouseEvent): Promise<void> => {
    const { name } = target as HTMLButtonElement;

    if (name === 'update') {
      firstWord.current = wordText;
      setUpdate((prevState) => !prevState);
    } else if (name === 'cancel') {
      setWordText(firstWord.current);
      firstWord.current = '';
      setUpdate((prevState) => !prevState);
    } else if (name === 'create') {
      setLoading(true);

      try {
        // await updateCategories(id, titleText);
      } catch (err) {
        setWordText(firstWord.current);
        console.log(err);
      }

      setUpdate(false);
      setLoading(false);
    } else if (name === 'delete') {
      setLoading(true);

      try {
        // await deleteCategory(id);
        setCards((prevState) => prevState.filter(({ _id }) => _id !== id));
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }
    //  else if (name === 'add') {
    //   history.push(`${`${ADMIN + WORDS}/${id}`}`);
    // }
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
      {
        isUpdate
          ? (
            <form action="">
              <input type="text" required name="category" value={category} onChange={handleChange} />
              <input type="text" required name="word" value={wordText} onChange={handleChange} />
              <input type="text" required name="translation" value={translationText} onChange={handleChange} />
              <input type="file" required name="image" onChange={handleChange} />
              <input type="file" required name="audio" onChange={handleChange} />
            </form>
          ) : (
            <>
              <div>
                Word:
                <span>
                  {wordText}
                </span>
              </div>
              <div>
                Translation:
                <span>
                  {translationText}
                </span>
              </div>
              <div>
                Sound file:
                <span>
                  {audio.split('/').pop()}
                </span>
              </div>
              <div>Image:</div>
              <img src={image} alt="" />
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
              <>
                <AdminBtn name="update" content="Change" onClick={handleClick} />
              </>
            )
        }
      </div>
    </li>
  );
}

export default WordCard;
