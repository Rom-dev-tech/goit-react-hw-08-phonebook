import * as Yup from 'yup';

const disabled = (isSubmitting, errors, touched) => {
  return (
    isSubmitting ||
    !(Object.keys(errors).length === 0 && Object.keys(touched).length)
  );
};

const name = () =>
  Yup.string()
    .min(3, 'Invalid name. Name should have at least 3 symbol')
    .required('Required');

const email = () =>
  Yup.string().email('Invalid email address').required('Required');

const password = () =>
  Yup.string()
    .min(7, 'Invalid password. Password should be greater then 7 symbols')
    .max(15, 'Invalid password. Password should be less then 15 symbols')
    .required('Required');

const confirmPassword = () =>
  Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Confirm password shoul be equal to password'
    )
    .required('Required');

const authHalpers = {
  disabled,
  name,
  email,
  password,
  confirmPassword,
};
export default authHalpers;
