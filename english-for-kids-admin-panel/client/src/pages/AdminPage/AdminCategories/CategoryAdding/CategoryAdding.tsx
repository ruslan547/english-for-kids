import { Dispatch, SetStateAction, useState } from 'react';
import { Category, createCategories } from '../../../../services/categoryService';
import './CategoryAdding.scss';

interface CategoryAddingProps {
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

function CategoryAdding({ setCategories }: CategoryAddingProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const category = await createCategories();

      setCategories((prevState) => [...prevState, category]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <li className="category-card">
      <h3 className="category-card__title">Create new category</h3>
      <button type="button" className="category-card__adding-btn" disabled={loading} onClick={handleClick}>
        +
      </button>
    </li>
  );
}

export default CategoryAdding;
