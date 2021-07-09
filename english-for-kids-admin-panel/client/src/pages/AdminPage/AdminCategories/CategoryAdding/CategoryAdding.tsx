import {
  ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState,
} from 'react';
import { categories } from '../../../../db/cards';
import { Category, createCategory } from '../../../../services/categoryService';
import AdminBtn from '../../AdminBtn/AdminBtn';
import './CategoryAdding.scss';

interface CategoryAddingProps {
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

function CategoryAdding({ setCategories }: CategoryAddingProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [titleText, setTitleText] = useState('');

  const handleClick = async (event: MouseEvent) => {
    const { name, tagName } = event.target as HTMLButtonElement;
    event.stopPropagation();

    if (name === 'create') {
      setLoading(true);

      const category = await createCategory(titleText);

      setCategories((prevState) => [...prevState, category as Category]);
      setTitleText('');
      setCreate(false);
      setLoading(false);
    } else if (tagName === 'LI') {
      setCreate((prevState) => {
        if (!prevState) {
          return !prevState;
        }

        return prevState;
      });
    } else if (name === 'cancel') {
      setTitleText('');
      setCreate(false);
    }
  };

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setTitleText(value);
  };

  return (
    <li
      className={`category-card ${!isCreate ? 'card-add' : ''}`}
      onClick={handleClick}
      onKeyDown={() => { }}
    >
      {
        isCreate
          ? (
            <>
              <div className="category-card__category-update">
                <label className="category-card__label" htmlFor="">Category name</label>
                <input className="category-card__input" type="text" value={titleText} onChange={handleChange} />
              </div>
              <div className="category-card__btns">
                <span className="category-card__cancel">
                  <AdminBtn name="cancel" content="Cancel" onClick={handleClick} />
                </span>
                <AdminBtn disabled={loading} name="create" content="Create" onClick={handleClick} />
              </div>
            </>
          ) : (
            <h3 className="category-card__title">Create new category</h3>
          )
      }
    </li>
  );
}

export default CategoryAdding;
