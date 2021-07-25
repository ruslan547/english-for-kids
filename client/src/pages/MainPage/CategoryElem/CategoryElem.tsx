import { Link } from 'react-router-dom';
import pathsConstants from '../../../constants/pathsConstants';
import routesConstants from '../../../constants/routesConstants';
import './CategoryElem.scss';

export interface CategoryProps {
  image: string;
  path: string;
  title: string;
}

export function CategoryElem({ image, path, title }: CategoryProps): JSX.Element {
  return (
    <li>
      <Link className="category" to={`${routesConstants.CATEGORY}/${path}`}>
        <img className="category__img" src={image} alt="" />
        <span>{title}</span>
      </Link>
    </li>
  );
}
