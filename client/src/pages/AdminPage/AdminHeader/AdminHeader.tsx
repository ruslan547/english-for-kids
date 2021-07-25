import './AdminHeader.scss';
import { useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import contentConstants from '../../../constants/contentConstants';
import routesConstants from '../../../constants/routesConstants';
import { deleteCookie } from '../../../services/cookiesService';
import { useAppDispatch } from '../../../app/hooks';
import { setLogin } from '../../../components/Header/HamburgerMenu/hamburgerMenu';

function AdminHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const { url } = useRouteMatch();
  const history = useHistory();

  const handleClick = (): void => {
    deleteCookie('sessionid');
    dispatch(setLogin(false));
    history.push(routesConstants.MAIN);
  };

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
          <button type="button" onClick={handleClick}>
            {contentConstants.LOGOUT}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminHeader;
