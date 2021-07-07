/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
import './CategoryCard.scss';
import { MouseEvent, useState } from 'react';
import AdminBtn from '../../AdminBtn/AdminBtn';

function CategoryCard(): JSX.Element {
  const [isUpdate, setUpdate] = useState(false);

  const handleClick = ({ target }: MouseEvent): void => {
    const { name } = target as HTMLButtonElement;

    if (name === 'update') {
      setUpdate((prevState) => !prevState);
    } else if (name === 'cancel') {
      setUpdate((prevState) => !prevState);
    }
  };

  return (
    <li className="category-card">
      {isUpdate ? null : <h3 className="category-card__title">title</h3>}
      <span className="category-card__close" onClick={() => { }} onKeyDown={() => { }}>
        &times;
      </span>
      {
        isUpdate
          ? <div className="category-card__category-update">
            <label className="category-card__label" htmlFor="">Category name</label>
            <input className="category-card__input" type="text" />
          </div>
          : <div className="category-card__count">
            WORDS:
            <span className="category-card__count_num"> 5</span>
          </div>
      }
      <div className="category-card__btns">
        {isUpdate
          ? <>
            <span className="category-card__cancel">
              <AdminBtn name="cancel" content="Cancel" onClick={handleClick} />
            </span>
            <AdminBtn name="add" content="Create" onClick={handleClick} />
          </>
          : <>
            <AdminBtn name="update" content="Update" onClick={handleClick} />
            <AdminBtn name="add" content="Add word" onClick={handleClick} />
          </>}
      </div>
    </li>
  );
}

export default CategoryCard;
