import { useState } from 'react';
import toastr from 'toastr';
import toastrOptions from 'components/Notification';

const checkValidatitonOfNewContact = (contacts, value, currentID) => {
  return contacts.find(
    ({ id, name, number }) =>
      (name.toLowerCase() === value.toLowerCase() && id !== currentID) ||
      (number.toLowerCase() === value.toLowerCase() && id !== currentID)
  );
};

const toastrMessage = (message) => {
  toastr.error(`Contact ${message} is already in contacts`);
  toastrOptions();
};

const HandleToggle = (initialValue) => {
  const [showModal, setShowModal] = useState(initialValue);

  const toggleModal = () => setShowModal(!showModal);

  return {
    showModal,
    toggleModal,
  };
};

const FormHalper = {
  checkValidatitonOfNewContact,
  toastrMessage,
  HandleToggle,
};

export default FormHalper;
