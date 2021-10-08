import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
  const [chackOnError, setChackOnError] = useState(true);

  const errorMessage = useSelector(authSelectors.getErrorMessage);

  useEffect(() => {
    setChackOnError(false);
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 7 || values.password.length > 15) {
      errors.password =
        'Invalid password. Password should be greater then 7 symbols and less then 15 symbols';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const email = values.email;
    const password = values.password;
    dispatch(authOperations.logIn({ email, password }));
    setSubmitting(false);
    setChackOnError(true);
  };

  const disabled = (isSubmitting, errors, touched) => {
    return (
      isSubmitting ||
      !(Object.keys(errors).length === 0 && Object.keys(touched).length)
    );
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
                  type="password"
                  name="password"
                  className="input"
                  placeholder="enter your password"
                />
              </label>

              <Button
                type="submit"
                discription="Sign in"
                variant="big__button"
                disabled={disabled(isSubmitting, errors, touched)}
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
