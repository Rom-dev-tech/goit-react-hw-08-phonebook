import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsOparations, contactsSelectors } from 'redux/phonebook';
import Form from 'components/Form';
import FormHalper from 'components/functionsHelpersForForm';
import Button from 'components/Button';
import useInput from 'Hooks/useInput';

const ContactsFomr = ({ onClose }) => {
  const inputName = useInput('');
  const inputNumber = useInput('');

  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);

  const onSubmit = (event) => {
    event.preventDefault();

    if (FormHalper.checkValidatitonOfNewContact(contacts, inputName.value)) {
      FormHalper.toastrMessage(inputName.value);
      return;
    }

    if (FormHalper.checkValidatitonOfNewContact(contacts, inputNumber.value)) {
      FormHalper.toastrMessage(inputNumber.value);
      return;
    }

    dispatch(contactsOparations.addContact(inputName.value, inputNumber.value));
    onClose();
  };

  return (
    <Form onSubmit={onSubmit} inputName={inputName} inputNumber={inputNumber}>
      <Button type="submit" discription="Add contact" variant="big__button" />
    </Form>
  );
};

ContactsFomr.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ContactsFomr;
