import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import AuthHalpers from 'views/functionsHelpersForRegistration';
import Container from 'components/Container';
import NotificatiomMessage from 'components/NotificatiomMessage';
import Button from 'components/Button';
import { authOperations, authSelectors } from 'redux/auth';
import 'views/RegisterView/RegisterView.scss';

const LoginView = () => {
  const dispatch = useDispatch();
  const [chackOnError, setChackOnError] = useState(true);

  const errorMessage = useSelector(authSelectors.getErrorMessage);

  const authHalpers = AuthHalpers.HandleVisibilityPassword(false);

  useEffect(() => {
    setChackOnError(false);
  }, []);

  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  const SigninSchema = Yup.object().shape({
    email: AuthHalpers.emailYupValidation(),
    password: AuthHalpers.passwordYupValidation(),
  });

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
          initialValues={INITIAL_VALUES}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form" autoComplete="off">
              <label htmlFor="email" className="label">
                Email: <ErrorMessage name="email" />
                <Field
                  type="email"
                  name="email"
                  className="input"
                  placeholder="enter your email"
                />
              </label>

              <label htmlFor="password" className="label">
                Password: <ErrorMessage name="password" />
                <Field
                  type={authHalpers.showPassword ? 'text' : 'password'}
                  name="password"
                  className="input"
                  placeholder="enter your password"
                />
                <span
                  className="visibility__icon"
                  aria-label="toggle password visibility"
                  onClick={authHalpers.handleClickShowPassword}
                  onMouseDown={AuthHalpers.handleMouseDownPassword}
                >
                  {authHalpers.showPassword ? (
                    <MdVisibilityOff />
                  ) : (
                    <MdVisibility />
                  )}
                </span>
              </label>

              <Button
                type="submit"
                discription="Sign in"
                variant="big__button"
                disabled={AuthHalpers.disabled(isSubmitting, errors, touched)}
              ></Button>
            </Form>
          )}
        </Formik>

        {chackOnError && errorMessage && (
          <NotificatiomMessage color="red" message={errorMessage} />
        )}
      </Container>
    </section>
  );
};

export default LoginView;
