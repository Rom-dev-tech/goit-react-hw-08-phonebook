import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import NotificatiomMessage from 'components/NotificatiomMessage';
import { authOperations, authSelectors } from 'redux/auth';
import Container from 'components/Container';
import Button from 'components/Button';
import 'views/RegisterView/RegisterView.scss';

const RegisterView = () => {
  const dispatch = useDispatch();
  const [chackOnError, setChackOnError] = useState(true);

  useEffect(() => {
    setChackOnError(false);
  }, []);

  const errorMessage = useSelector(authSelectors.getErrorMessage);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length < 3) {
      errors.name = 'Invalid name. Name should have at least 3 symbol';
    }

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

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Confirm password shoul be equal to password';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const name = values.name;
    const email = values.email;
    const password = values.password;
    dispatch(authOperations.register({ name, email, password }));
    setChackOnError(true);
    setSubmitting(false);
  };

  const disabled = (isSubmitting, errors, touched) => {
    return (
      isSubmitting ||
      !(Object.keys(errors).length === 0 && Object.keys(touched).length)
    );
  };

  return (
    <div className="register__wrapper">
      <Container>
        <h1 className="register__title">Registration</h1>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="form form--end" autoComplete="off">
              <label htmlFor="Name" className="label">
                Name: <ErrorMessage name="name" />
                <Field
                  type="text"
                  name="name"
                  className="input"
                  placeholder="enter your name"
                />
              </label>

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

              <label htmlFor="confirmPassword" className="label">
                ConfirmPassword: <ErrorMessage name="confirmPassword" />
                <Field
                  type="password"
                  name="confirmPassword"
                  className="input"
                  placeholder="confirm your password"
                />
              </label>

              <Button
                type="submit"
                discription="Sign up"
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
    </div>
  );
};

export default RegisterView;
