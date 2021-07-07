import { useState } from 'react';
import { Category, createCategories } from '../../../../services/categoryService';
import './CategoryAdding.scss';

interface CategoryAddingProps {
  addCategory: (category: Category) => void;
}

function CategoryAdding({ addCategory }: CategoryAddingProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const category = await createCategories();

      addCategory(category);
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
