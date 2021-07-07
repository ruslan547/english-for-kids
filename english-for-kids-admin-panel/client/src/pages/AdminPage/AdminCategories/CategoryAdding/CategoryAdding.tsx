import './CategoryAdding.scss';

function CategoryAdding(): JSX.Element {
  return (
    <li className="category-card">
      <h3 className="category-card__title">Create new category</h3>
      <button type="button" className="category-card__adding-btn">
        +
      </button>
    </li>
  );
}

export default CategoryAdding;
