import { MouseEventHandler } from 'react';
import './AdminBtn.scss';

interface AdminBtnProps {
  name: string;
  content: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AdminBtn({
  name,
  content,
  onClick,
}: AdminBtnProps): JSX.Element {
  return (
    <button className="admin-btn" name={name} type="button" onClick={onClick}>
      {content}
    </button>
  );
}

export default AdminBtn;
