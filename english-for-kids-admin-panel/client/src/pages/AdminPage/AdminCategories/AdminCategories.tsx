import './AdminCategories.scss';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryAdding from './CategoryAdding/CategoryAdding';
import { Category, getCategories } from '../../../services/categoryService';

function AdminCategories(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);

  const getData = async () => {
    const data = await getCategories();

    setCategories(data);
  };

  const createCategoriesList = () => categories.map(({ _id, title, words }) => (
    <CategoryCard
      key={_id}
      id={_id}
      title={title}
      words={words}
    />
  ));

  useEffect(() => {
    getData();
  }, [categories]);

  return (
    <ul className="admin-categories">
      {createCategoriesList()}
      <CategoryAdding />
    </ul>
  );
}

export default AdminCategories;
