import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import NotificatiomMessage from 'components/NotificatiomMessage';
import { authOperations, authSelectors } from 'redux/auth';
import '../RegisterView/RegisterView.scss';

const LoginView = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chackOnError, setChackOnError] = useState(true);

  const errorMessage = useSelector(authSelectors.getErrorMessage);

  useEffect(() => {
    setChackOnError(false);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
    setChackOnError(true);
  };

  return (
    <div className="login__wrapper">
      <h1 className="register__title">Login to Service</h1>

      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <label className="label">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className="label">
          Pasword
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <button className="register__button" type="submit">
          Sign in
        </button>
      </form>

      {chackOnError && errorMessage && (
        <NotificatiomMessage color="red" message={errorMessage} />
      )}
    </div>
  );
};

export default LoginView;
