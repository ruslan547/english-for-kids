import './AdminCategories.scss';
import {
  useEffect, useRef, useState,
} from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import CategoryAdding from './CategoryAdding/CategoryAdding';
import { Category, getCategories } from '../../../services/categoryService';
import settingNumConstants from '../../../constants/settingNumConstants';

const {
  PAGE_LIMIT,
  PAGE_LIMIT_INIT,
} = settingNumConstants;

function AdminCategories(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const ul = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);

  const addCategories = async (num: number) => {
    const data = await getCategories(num, page ? PAGE_LIMIT : PAGE_LIMIT_INIT);

    setCategories((prevState) => [...prevState, ...data]);
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

  const nextPage = (): void => {
    if (ul && ul.current) {
      if (ul.current.scrollTop + ul.current.clientHeight >= ul.current.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleScroll = () => {
    nextPage();
  };

  useEffect(() => {
    addCategories(page);
  }, [page]);

  useEffect(() => {
    nextPage();
  }, []);

  return (
    <ul className="admin-categories" ref={ul} onScroll={handleScroll}>
      {createCategoriesList()}
      <CategoryAdding setCategories={setCategories} />
    </ul>
  );
}

export default AdminCategories;
