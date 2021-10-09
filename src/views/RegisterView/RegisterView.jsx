import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authHalpers from 'views/functionsHelpersForRegistration';
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

  const INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const SignupSchema = Yup.object().shape({
    name: authHalpers.name(),
    email: authHalpers.email(),
    password: authHalpers.password(),
    confirmPassword: authHalpers.confirmPassword(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const name = values.name;
    const email = values.email;
    const password = values.password;
    dispatch(authOperations.register({ name, email, password }));
    setChackOnError(true);
    setSubmitting(false);
  };

  return (
    <div className="register__wrapper">
      <Container>
        <h1 className="register__title">Registration</h1>

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={SignupSchema}
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
                disabled={authHalpers.disabled(isSubmitting, errors, touched)}
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
