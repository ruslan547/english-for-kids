import './AdminHeader.scss';
import { useRouteMatch, NavLink } from 'react-router-dom';
import contentConstants from '../../../constants/contentConstants';
import routesConstants from '../../../constants/routesConstants';

function AdminHeader(): JSX.Element {
  const { url } = useRouteMatch();

  return (
    <div className="admin-header">
      <ul className="container admin-header__container">
        <li className="admin-header__item">
          <NavLink to={url} exact activeStyle={{ textDecoration: 'underline' }}>
            {contentConstants.CATEGORIES}
          </NavLink>
        </li>
        <li className="admin-header__item">
          <NavLink to={`${url}${routesConstants.WORDS}`} activeStyle={{ textDecoration: 'underline' }}>
            {contentConstants.WORDS}
          </NavLink>
        </li>
        <li className="admin-header__item">
          <button type="button">
            {contentConstants.LOGOUT}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminHeader;
