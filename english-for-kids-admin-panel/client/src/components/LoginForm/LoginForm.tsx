import contentConstants from '../../constants/contentConstants';
import './LoginForm.scss';

interface LoginFormProps {
  onClose: () => void;
}

function LoginForm({
  onClose,
}: LoginFormProps): JSX.Element {
  return (
    <form className="login-form" action="">
      <input type="text" />
      <input type="password" />
      <div>
        <button
          className="login-form__btn login-form__btn_close"
          type="button"
          onClick={onClose}
        >
          {contentConstants.CLOSE}
        </button>
        <button className="login-form__btn" type="button">
          {contentConstants.LOGIN}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
