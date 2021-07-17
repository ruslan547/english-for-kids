import { ChangeEvent, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import contentConstants from '../../constants/contentConstants';
import routesConstants from '../../constants/routesConstants';
import settingConstants from '../../constants/settingConstants';
import { login } from '../../services/authService';
import { setCookie } from '../../services/cookiesService';
import { setLogin } from '../Header/HamburgerMenu/hamburgerMenu';
import './LoginForm.scss';

interface LoginFormProps {
  onClose: () => void;
}

function LoginForm({
  onClose,
}: LoginFormProps): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleClick = async ({ target }: MouseEvent<HTMLButtonElement>): Promise<void> => {
    (target as HTMLButtonElement).disabled = true;
    setError('');

    try {
      const data = await login(username, password);
      setCookie(settingConstants.TOKEN_COOKIES_NAME, data.token);
      dispatch(setLogin(true));
      onClose();
      setTimeout(() => history.push(routesConstants.ADMIN), 0);
    } catch (err) {
      setError(err.message);
      (target as HTMLButtonElement).disabled = false;
      setUsername('');
      setPassword('');
    }
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>): void => {
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <form className="login-form" action="">
      <div className="login-form__info">
        login:
        <span> admin</span>
        <br />
        password:
        <span> admin</span>
      </div>
      {error ? <div className="login-form__err">{error}</div> : null}
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="password"
      />
      <div>
        <button
          className="login-form__btn login-form__btn_close"
          type="button"
          onClick={onClose}
        >
          {contentConstants.CLOSE}
        </button>
        <button
          className="login-form__btn"
          type="button"
          onClick={handleClick}
        >
          {contentConstants.LOGIN}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
