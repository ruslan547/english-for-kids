import './AdminCategories.scss';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryAdding from './CategoryAdding/CategoryAdding';

function AdminCategories(): JSX.Element {
  return (
    <ul className="admin-categories">
      <CategoryCard />
      <CategoryAdding />
    </ul>
  );
}

export default AdminCategories;
