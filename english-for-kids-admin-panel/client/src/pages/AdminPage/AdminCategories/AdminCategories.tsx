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
  const [count, setCount] = useState(0);

  const addCategories = async (num: number) => {
    const data = await getCategories(num, page ? PAGE_LIMIT : PAGE_LIMIT_INIT);

    setCategories((prevState) => [...prevState, ...data.categories]);
    setCount(+data.count);
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

  const isScroll = () => {
    if (ul && ul.current) {
      return ul.current.scrollHeight > ul.current.clientHeight;
    }

    return false;
  };

  // const nextPage = (): void => {
  //   console.log(count);
  //   if (ul && ul.current) {
  //     if (ul.current.scrollTop + ul.current.clientHeight >= ul.current.scrollHeight) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   }
  // };

  const handleScroll = () => {
    // nextPage();
  };

  useEffect(() => {
    addCategories(page);
  }, []);

  useEffect(() => {
    if (!isScroll && categories.length < count) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [categories]);

  useEffect(() => {
    console.log('useE', page);
    addCategories(page);
  }, [page]);

  // useEffect(() => {
  //   if (!isScroll) {
  //     nextPage();
  //   }
  // }, [categories]);

  return (
    <ul className="admin-categories" ref={ul} onScroll={handleScroll}>
      {console.log(page, categories)}
      {createCategoriesList()}
      <CategoryAdding setCategories={setCategories} />
    </ul>
  );
}

export default AdminCategories;
