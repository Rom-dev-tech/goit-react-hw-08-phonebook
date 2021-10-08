import React from 'react';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Container from 'components/Container';
import NotificatiomMessage from 'components/NotificatiomMessage';
import Button from 'components/Button';
import { authOperations, authSelectors } from 'redux/auth';
import 'views/RegisterView/RegisterView.scss';

const LoginView = () => {
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [chackOnError, setChackOnError] = useState(true);

  const errorMessage = useSelector(authSelectors.getErrorMessage);

  useEffect(() => {
    setChackOnError(false);
  }, []);

  const initialValues = { email: '', password: '' };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  // const handleChange = ({ target: { name, value } }) => {
  //   switch (name) {
  //     case 'email':
  //       return setEmail(value);
  //     case 'password':
  //       return setPassword(value);
  //     default:
  //       return;
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(authOperations.logIn(initialValues.email, initialValues.password));
  //   setEmail('');
  //   setPassword('');
  //   setChackOnError(true);
  // };

  const handleSubmit = (values, { setSubmitting }) => {
    const email = values.email;
    const password = values.password;
    dispatch(authOperations.logIn({ email, password }));
    setSubmitting(false);
    setChackOnError(true);
  };

  return (
    <section className="login__wrapper">
      <h1 className="register__title">Login to Service</h1>
      <Container>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="form" autoComplete="off">
              <label htmlFor="email" className="label">
                Email:
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </label>
              {errors.email && touched.email && errors.email}

              <label htmlFor="password" className="label">
                Password:
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </label>
              {errors.password && touched.password && errors.password}

              <Button
                type="submit"
                discription="Sign in"
                variant="big__button"
                disabled={isSubmitting}
              />
            </form>
          )}
        </Formik>

        {/* <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <label className="label">
          Email
          <input
            className="input"
            type="email"
            placeholder="enter your email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>

        <label className="label">
          Pasword
          <input
            className="input"
            type="password"
            placeholder="enter your password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>

        <Button type="submit" discription="Sign in" variant="big__button" />
      </form> */}

        {chackOnError && errorMessage && (
          <NotificatiomMessage color="red" message={errorMessage} />
        )}
      </Container>
    </section>
  );
};

export default LoginView;
