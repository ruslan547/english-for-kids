import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeMenu, closeModal, openMenu } from './hamburgerMenu';
import './HamburgerMenu.scss';
import { MenuBtn } from './MenuBtn/MenuBtn';
import MenuList from './MenuList/MenuList';
import Modal from '../../Modal/Modal';
import contentConstants from '../../../constants/contentConstants';
import LoginForm from '../../LoginForm/LoginForm';

function HamburgerMenu(): JSX.Element {
  const { isMenu, isModal } = useAppSelector((state) => state.hamburgerMenu);
  const dispatch = useAppDispatch();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    dispatch(target.checked ? openMenu() : closeMenu());
  };

  const handleClick = (): void => {
    dispatch(closeMenu());
  };

  const onClose = (): void => {
    dispatch(closeModal());
  };

  return (
    // https://medium.com/@krokhin.ezh/%D0%BA%D0%B0%D0%BA-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%B3%D0%B0%D0%BC%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80-%D0%BC%D0%B5%D0%BD%D1%8E-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-css-%D0%B8-html-c6abf7c32c6d
    <div className="hamburger-menu">
      <MenuBtn menu={isMenu} onChange={handleChange} />
      <MenuList />
      <div className="menu__cover" onClick={handleClick} onKeyDown={handleClick} />
      <Modal
        visible={isModal}
        title={contentConstants.LOGIN}
        content={<LoginForm onClose={onClose} />}
        footer=""
        onClose={onClose}
      />
    </div>
  );
}

export default HamburgerMenu;
