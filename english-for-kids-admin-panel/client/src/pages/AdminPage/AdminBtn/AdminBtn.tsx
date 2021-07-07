import { MouseEventHandler } from 'react';
import './AdminBtn.scss';

interface AdminBtnProps {
  name: string;
  content: string;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AdminBtn({
  name,
  content,
  disabled = false,
  onClick,
}: AdminBtnProps): JSX.Element {
  return (
    <button className="admin-btn" name={name} type="button" disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}

export default AdminBtn;
