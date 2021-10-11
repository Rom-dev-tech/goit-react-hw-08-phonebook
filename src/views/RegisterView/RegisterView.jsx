import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MdVisibilityOff } from 'react-icons/md';
import { MdVisibility } from 'react-icons/md';
import AuthHalpers from 'views/functionsHelpersForRegistration';
import NotificatiomMessage from 'components/NotificatiomMessage';
import { authOperations, authSelectors } from 'redux/auth';
import Container from 'components/Container';
import Button from 'components/Button';
import 'views/RegisterView/RegisterView.scss';

const RegisterView = () => {
  const dispatch = useDispatch();
  const [chackOnError, setChackOnError] = useState(true);

  const authHalpers = AuthHalpers.HandleVisibilityPassword(false);

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
    name: AuthHalpers.nameYupValidation(),
    email: AuthHalpers.emailYupValidation(),
    password: AuthHalpers.passwordYupValidation(),
    confirmPassword: AuthHalpers.confirmPasswordYupValidation(),
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

              <label htmlFor="confirmPassword" className="label">
                ConfirmPassword: <ErrorMessage name="confirmPassword" />
                <Field
                  type={authHalpers.showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="input"
                  placeholder="confirm your password"
                />
                <span
                  className="visibility__icon"
                  aria-label="toggle password visibility"
                  onClick={authHalpers.handleClickShowConfirmPassword}
                  onMouseDown={AuthHalpers.handleMouseDownPassword}
                >
                  {authHalpers.showConfirmPassword ? (
                    <MdVisibilityOff />
                  ) : (
                    <MdVisibility />
                  )}
                </span>
              </label>

              <Button
                type="submit"
                discription="Sign up"
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
    </div>
  );
};

export default RegisterView;
