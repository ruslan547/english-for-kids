import { Link } from 'react-router-dom';
import pathsConstants from '../../../constants/pathsConstants';
import routesConstants from '../../../constants/routesConstants';
import './Category.scss';

export interface CategoryProps {
  image: string;
  path: string;
  title: string;
}

export function Category({ image, path, title }: CategoryProps): JSX.Element {
  return (
    <li>
      <Link className="category" to={`${routesConstants.CATEGORY}${path}`}>
        <img className="category__img" src={`${pathsConstants.ASSETS_DIR}/${image}`} alt="" />
        <span>{title}</span>
      </Link>
    </li>
  );
}
