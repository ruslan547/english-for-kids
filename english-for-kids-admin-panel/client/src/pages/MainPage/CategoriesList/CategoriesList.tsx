import './CategoriesList.scss';
import { cards, categories } from '../../../db/cards';
import { Category } from '../Category/Category';
import settingNumConstants from '../../../constants/settingNumConstants';

const { INDEX_OF_CATEGORY_PATH, INDEX_OF_CATEGORY_TITLE } = settingNumConstants;

function CategoriesList(): JSX.Element {
  const categoriesList = categories.map((item, index) => (
    <Category
      key={item[INDEX_OF_CATEGORY_PATH]}
      image={(cards[index][INDEX_OF_CATEGORY_TITLE]).image}
      path={item[INDEX_OF_CATEGORY_PATH]}
      title={item[INDEX_OF_CATEGORY_TITLE]}
    />
  ));

  return (
    <ul className="categories-list">{categoriesList}</ul>
  );
}

export default CategoriesList;
