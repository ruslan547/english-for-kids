import './CategoryCard.scss';
import {
  ChangeEvent, Dispatch, MouseEvent, SetStateAction, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import AdminBtn from '../../AdminBtn/AdminBtn';
import contentConstants from '../../../../constants/contentConstants';
import { Category, deleteCategory, updateCategories } from '../../../../services/categoryService';
import routesConstants from '../../../../constants/routesConstants';
import { setLogin } from '../../../../components/Header/HamburgerMenu/hamburgerMenu';
import { useAppDispatch } from '../../../../app/hooks';

const {
  ADMIN,
  WORDS,
} = routesConstants;

interface CategoryCardProps {
  id: string;
  title: string;
  words: number;
  setCategories: Dispatch<SetStateAction<Category[]>>
}

function CategoryCard({
  id,
  title,
  words,
  setCategories,
}: CategoryCardProps): JSX.Element {
  const firstTitle = useRef('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isUpdate, setUpdate] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const [loading, setLoading] = useState(false);

  const handleClick = async ({ target }: MouseEvent): Promise<void> => {
    const { name } = target as HTMLButtonElement;

    if (name === 'update') {
      firstTitle.current = titleText;
      setUpdate((prevState) => !prevState);
    } else if (name === 'cancel') {
      setTitleText(firstTitle.current);
      firstTitle.current = '';
      setUpdate((prevState) => !prevState);
    } else if (name === 'create') {
      setLoading(true);

      try {
        await updateCategories(id, titleText);
      } catch (err) {
        setTitleText(firstTitle.current);
        dispatch(setLogin(false));
      }

      setUpdate(false);
      setLoading(false);
    } else if (name === 'delete') {
      setLoading(true);

      try {
        await deleteCategory(id);
        setCategories((prevState) => prevState.filter(({ _id }) => _id !== id));
      } catch (err) {
        dispatch(setLogin(false));
      }
    } else if (name === 'add') {
      history.push(`${`${ADMIN + WORDS}/${id}`}`);
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitleText(target.value);
  };

  return (
    <li className="category-card">
      {isUpdate ? null : <h3 className="category-card__title">{titleText}</h3>}
      <button className="category-card__close" disabled={loading} type="button" name="delete" onClick={handleClick}>
        &times;
      </button>
      {
        isUpdate
          ? (
            <div className="category-card__category-update">
              <label className="category-card__label" htmlFor="">Category name</label>
              <input className="category-card__input" type="text" value={titleText} onChange={handleChange} />
            </div>
          )
          : (
            <div className="category-card__count">
              {contentConstants.WORDS_COUNT}
              <span className="category-card__count_num">
                {words}
              </span>
            </div>
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
                <AdminBtn name="update" content="Update" onClick={handleClick} />
                <AdminBtn name="add" content="Add word" onClick={handleClick} />
              </>
            )
        }
      </div>
    </li>
  );
}

export default CategoryCard;
