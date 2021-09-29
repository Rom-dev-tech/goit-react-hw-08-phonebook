import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import NotificatiomMessage from 'components/NotificatiomMessage';
import { authOperations, authSelectors } from 'redux/auth';
import Container from 'components/Container';
import 'views/RegisterView/RegisterView.scss';

const RegisterView = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chackOnError, setChackOnError] = useState(true);

  useEffect(() => {
    setChackOnError(false);
  }, []);

  const errorMessage = useSelector(authSelectors.getErrorMessage);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
    setChackOnError(true);
  };

  return (
    <div className="register__wrapper">
      <Container>
        <h1 className="register__title">Registration</h1>

        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          <label className="label">
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </label>

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
            Sign up
          </button>
        </form>
        {chackOnError && errorMessage && (
          <NotificatiomMessage color="red" message={errorMessage} />
        )}
      </Container>
    </div>
  );
};

export default RegisterView;
