import { ChangeEvent, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import contentConstants from '../../constants/contentConstants';
import routesConstants from '../../constants/routesConstants';
import { login } from '../../services/authService';
import { setCookie } from '../../services/cookiesService';
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

  const handleClick = async ({ target }: MouseEvent<HTMLButtonElement>): Promise<void> => {
    (target as HTMLButtonElement).disabled = true;
    setError('');

    try {
      const data = await login(username, password);
      setCookie('sessionid', data.token);
      history.push(routesConstants.ADMIN);
      onClose();
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
        <span> user</span>
        <br />
        password:
        <span> 1234</span>
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
