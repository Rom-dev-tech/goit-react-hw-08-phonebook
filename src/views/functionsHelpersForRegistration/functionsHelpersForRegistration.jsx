import * as Yup from 'yup';
import { useState } from 'react';

const disabled = (isSubmitting, errors, touched) => {
  return (
    isSubmitting ||
    !(Object.keys(errors).length === 0 && Object.keys(touched).length)
  );
};

const nameYupValidation = () =>
  Yup.string().min(3, 'should have at least 3 symbol').required('Required');

const emailYupValidation = () =>
  Yup.string().email('Invalid email address').required('Required');

const passwordYupValidation = () =>
  Yup.string()
    .min(7, 'should be greater then 7 symbols')
    .max(15, 'should be less then 15 symbols')
    .required('Required');

const confirmPasswordYupValidation = () =>
  Yup.string()
    .oneOf([Yup.ref('password'), null], 'shoul be equal to password')
    .required('Required');

export const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

export const HandleVisibilityPassword = (initialValue) => {
  const [showPassword, setShowPassword] = useState(initialValue);
  const [showConfirmPassword, setConfirmPassword] = useState(initialValue);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setConfirmPassword(!showConfirmPassword);

  return {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
  };
};

const authHalpers = {
  disabled,
  nameYupValidation,
  emailYupValidation,
  passwordYupValidation,
  confirmPasswordYupValidation,
  handleMouseDownPassword,
  HandleVisibilityPassword,
};
export default authHalpers;
