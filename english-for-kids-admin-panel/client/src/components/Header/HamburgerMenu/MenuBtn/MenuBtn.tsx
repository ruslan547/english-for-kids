import { ChangeEventHandler } from 'react';
import './MenuBtn.scss';

export interface MenuBtnProps {
  menu: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function MenuBtn({ menu, onChange }: MenuBtnProps): JSX.Element {
  return (
    <>
      <input type="checkbox" id="menu__toggle" name="checked" checked={menu} onChange={onChange} />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span> </span>
      </label>
    </>
  );
}
