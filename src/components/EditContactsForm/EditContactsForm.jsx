import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOparations, contactsSelectors } from 'redux/phonebook';
import Modal from 'components/Modal';
import Form from 'components/Form';
import IconButton from 'components/IconButton';
import FormHalper from 'components/functionsHelpersForForm';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import Button from 'components/Button';
import useInput from 'Hooks/useInput';
import 'components/EditContactsForm/EditContactsForm.scss';

const EditContactsForm = ({ id, name, number }) => {
  const inputName = useInput(name);
  const inputNumber = useInput(number);

  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const formHalper = FormHalper.HandleToggle(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      FormHalper.checkValidatitonOfNewContact(contacts, inputName.value, id)
    ) {
      FormHalper.toastrMessage(inputName.value);
      return;
    }

    if (
      FormHalper.checkValidatitonOfNewContact(contacts, inputNumber.value, id)
    ) {
      FormHalper.toastrMessage(inputNumber.value);
      return;
    }

    dispatch(
      contactsOparations.editContact(id, inputName.value, inputNumber.value)
    );
    formHalper.toggleModal();
  };

  return (
    <>
      <IconButton onClick={formHalper.toggleModal} aria-label="edit contact">
        <EditIcon width="20" height="20" fill="green" />
      </IconButton>

      {formHalper.showModal && (
        <Modal onClose={formHalper.toggleModal}>
          <Form
            onSubmit={onSubmit}
            inputName={inputName}
            inputNumber={inputNumber}
          >
            <div className="buttons__wrapper">
              <Button
                type="button"
                discription="Cancel"
                variant="small__button"
                onClick={formHalper.toggleModal}
              />
              <Button
                type="submit"
                discription="Edit"
                variant="small__button"
              />
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

EditContactsForm.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default EditContactsForm;
