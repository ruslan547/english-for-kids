import { useEffect } from 'react';
import './Modal.scss';

// https://codepen.io/wcademy/pen/PozpPdx
interface ModalProps {
  visible: boolean
  title: string
  content: JSX.Element | string
  footer: JSX.Element | string
  onClose: () => void
}

function Modal({
  visible = false,
  title = '',
  content = '',
  footer = '',
  onClose,
}: ModalProps): JSX.Element | null {
  const onKeydown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) return null;

  return (
    <div className="modal" onClick={onClose} onKeyDown={() => { }}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} onKeyDown={() => { }}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
