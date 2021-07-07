import { useState } from 'react';
import { createCategories } from '../../../../services/categoryService';
import './CategoryAdding.scss';

function CategoryAdding(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      await createCategories();
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
