import './AdminCategories.scss';
import {
  useEffect, useRef, useState,
} from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryAdding from './CategoryAdding/CategoryAdding';
import { Category, getAllCategories, getCategories } from '../../../services/categoryService';
import settingNumConstants from '../../../constants/settingNumConstants';

const {
  PAGE_LIMIT,
} = settingNumConstants;

function AdminCategories(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const initCategories = async () => {
    const data = await getCategories(page, PAGE_LIMIT);

    setCategories(data.categories);
    setCount(+data.count);
    setPage((prevPage) => prevPage + 1);
  };

  const nextCategories = async () => {
    const data = await getCategories(page, PAGE_LIMIT);

    setCategories((prevState) => [...prevState, ...data.categories]);
    setPage((prevPage) => prevPage + 1);
  };

  const createCategoriesList = () => categories.map(({ _id, title, words }) => (
    <CategoryCard
      key={_id}
      id={_id}
      title={title}
      words={words}
      setCategories={setCategories}
    />
  ));

  const handleScroll = () => {
    if (
      categories.length < count
      && ulRef
      && ulRef.current
      && ulRef.current.scrollTop + ulRef.current.clientHeight >= ulRef.current.scrollHeight
    ) {
      nextCategories();
    }
  };

  useEffect(() => {
    initCategories();
  }, []);

  return (
    <ul
      className="admin-categories"
      ref={ulRef}
      onScroll={handleScroll}
    >
      {createCategoriesList()}
      <CategoryAdding setCategories={setCategories} />
    </ul>
  );
}

export default AdminCategories;
