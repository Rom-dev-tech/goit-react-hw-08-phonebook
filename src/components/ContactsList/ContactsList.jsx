import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaPhone } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { contactsOparations, contactsSelectors } from 'redux/phonebook';
import Title from 'components/Title';
import Filter from 'components/Filter';
import EditContactsForm from 'components/EditContactsForm';
import IconButton from 'components/IconButton';
import { ReactComponent as DeleteIcon } from 'icons/delete.svg';
import 'components/ContactsList/ContactsList.scss';

const ContactsList = () => {
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const dispatch = useDispatch();
  const totalContacts = useSelector(contactsSelectors.getTotalContactsCount);

  const onDeleteContact = (id) =>
    dispatch(contactsOparations.deleteContact(id));

  return (
    <>
      {totalContacts <= 0 ? (
        <p className="contacts__message">no contacts yet ...</p>
      ) : (
        <>
          <Title title="Contacts" type="h1" />
          <Filter />
          <ul className="contacts__list">
            {contacts.map(({ id, name, number }) => (
              <li className="contacts__item" key={id}>
                <a className="contacts__link" href={`tel:${number}`}>
                  <p className="contacts__name">
                    <IconContext.Provider
                      value={{ className: 'react__icons--user' }}
                    >
                      <FaUser />
                    </IconContext.Provider>
                    {name}
                  </p>

                  <p className="contacts__number">
                    <IconContext.Provider
                      value={{ className: 'react__icons--phone' }}
                    >
                      <FaPhone />
                    </IconContext.Provider>
                    {number}
                  </p>
                </a>

                <IconButton
                  onClick={() => onDeleteContact(id)}
                  aria-label="delete contact"
                >
                  <DeleteIcon width="20" height="20" fill="red" />
                </IconButton>

                <EditContactsForm id={id} name={name} number={number} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ContactsList;
