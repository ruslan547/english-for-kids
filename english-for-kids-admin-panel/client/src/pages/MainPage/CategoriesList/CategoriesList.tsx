import './CategoriesList.scss';
import { useEffect, useState } from 'react';
import { cards } from '../../../db/cards';
import settingNumConstants from '../../../constants/settingNumConstants';
import { Category, getAllCategories } from '../../../services/categoryService';
import { CategoryElem } from '../CategoryElem/CategoryElem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCategories } from '../../CategoryPage/categoryPageSlice';

const { INDEX_OF_CATEGORY_PATH, INDEX_OF_CATEGORY_TITLE } = settingNumConstants;

function CategoriesList(): JSX.Element {
  // const [categories, setCategories] = useState<Category[]>([]);
  const { categories } = useAppSelector((state) => state.categoryPage);
  const dispatch = useAppDispatch();

  const initCategories = async () => {
    const data = await getAllCategories();

    dispatch(setCategories(data.categories));
  };

  const categoriesList = categories.map(({ title, _id, image }) => (
    <CategoryElem
      key={_id}
      image={image}
      path={_id}
      title={title}
    />
  ));

  useEffect(() => {
    initCategories();
  }, []);

  return (
    <ul className="categories-list">{categoriesList}</ul>
  );
}

export default CategoriesList;
