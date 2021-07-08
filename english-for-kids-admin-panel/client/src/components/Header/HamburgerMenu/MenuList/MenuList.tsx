import './MenuList.scss';
import { Link, useParams } from 'react-router-dom';
import { MouseEvent } from 'react';
import routesConstants from '../../../../constants/routesConstants';
import { categories } from '../../../../db/cards';
import { useAppDispatch } from '../../../../app/hooks';
import { closeMenu, openModal } from '../hamburgerMenu';
import { setCurrentWord, setWords, stopGame } from '../../../../pages/CategoryPage/StartBtn/startBtnSlice';
import { setErrNum, setScore } from '../../../../pages/CategoryPage/ScoreBoard/scoreBoardSlice';
import settingNumConstants from '../../../../constants/settingNumConstants';
import contentConstants from '../../../../constants/contentConstants';
import { getCookie } from '../../../../services/cookiesService';

const {
  MAIN,
  CATEGORY,
  STATISTICS,
  ADMIN,
} = routesConstants;

const {
  INDEX_OF_CATEGORY_PATH,
  INDEX_OF_CATEGORY_TITLE,
} = settingNumConstants;

function MenuList(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const curRoute = `/${id ?? window.location.href.split('/').pop()}`;
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>): void => {
    if ((event.target as HTMLButtonElement).name === 'login') {
      dispatch(openModal());
    }

    dispatch(stopGame());
    dispatch(setScore([]));
    dispatch(setCurrentWord(''));
    dispatch(setWords([]));
    dispatch(setErrNum(0));
    dispatch(closeMenu());
  };

  const list = categories.map((item) => {
    const isActive = curRoute === item[INDEX_OF_CATEGORY_PATH];
    const categoryClass = `menu__item ${isActive ? 'menu__item_active' : ''}`;

    return (
      <li key={item[INDEX_OF_CATEGORY_PATH]}>
        <Link
          className={categoryClass}
          to={`${CATEGORY}${item[INDEX_OF_CATEGORY_PATH]}`}
          onClick={handleClick}
        >
          {item[INDEX_OF_CATEGORY_TITLE]}
        </Link>
      </li>
    );
  });

  return (
    <ul className="menu__list">
      <li>
        <Link
          className={`menu__item ${curRoute === MAIN ? 'menu__item_active' : ''}`}
          to={MAIN}
          onClick={handleClick}
        >
          {contentConstants.MAIN}
        </Link>
      </li>
      {list}
      <li>
        <Link
          className={`menu__item ${curRoute === STATISTICS ? 'menu__item_active' : ''}`}
          to={STATISTICS}
          onClick={handleClick}
        >
          {contentConstants.STATISTICS}
        </Link>
      </li>
      <li className="menu__last-item">
        {
          getCookie('sessionid')
            ? <Link className="menu__item" to={ADMIN}>Admin</Link>
            : (
              <button
                className="menu__login-btn"
                type="button"
                name="login"
                onClick={handleClick}
              >
                {contentConstants.LOGIN}
              </button>
            )
        }
      </li>
    </ul>
  );
}

export default MenuList;
