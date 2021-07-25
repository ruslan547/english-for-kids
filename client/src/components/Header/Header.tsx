import './Header.scss';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';

function Header() {
  return (
    <div className="header">
      <HamburgerMenu />
      <ToggleSwitch />
    </div>
  );
}

export default Header;
