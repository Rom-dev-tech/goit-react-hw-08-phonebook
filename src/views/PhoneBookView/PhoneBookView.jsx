import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { contactsOparations, contactsSelectors } from 'redux/phonebook';
import FormHalper from 'components/functionsHelpersForForm';
import ContactsFomr from 'components/ContactsFomr';
import ContactsList from 'components/ContactsList';
import Clock from 'components/Clock';
import MainTitle from 'components/MainTitle';
import Сounter from 'components/Сounter';
import Modal from 'components/Modal';
import IconButton from 'components/IconButton';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import FlexWrapper from 'components/FlexWrapper';
import Container from 'components/Container';
import NotificatiomMessage from 'components/NotificatiomMessage';
import 'views/PhoneBookView/PhoneBookView.scss';

const PhoneBookView = () => {
  const formHalper = FormHalper.HandleToggle(false);

  const dispatch = useDispatch();

  const isLoading = useSelector(contactsSelectors.getLoading);
  const isError = useSelector(contactsSelectors.getError);

  useEffect(() => {
    dispatch(contactsOparations.fetchContacts());
  }, [dispatch]);

  return (
    <section className="phonebook__section">
      <Container>
        <Clock direction="end" size={30} />
        <MainTitle title="Phonebook" size={5} direction="center" />

        <FlexWrapper>
          <Сounter title="Total contacts:" />

          <IconButton onClick={formHalper.toggleModal} aria-label="add contact">
            <AddIcon width="20" height="20" fill="#03a9f4" />
          </IconButton>
        </FlexWrapper>

        {formHalper.showModal && (
          <Modal onClose={formHalper.toggleModal}>
            <ContactsFomr onClose={formHalper.toggleModal} />
          </Modal>
        )}

        {isLoading ? (
          <Loader
            style={{ textAlign: 'center' }}
            type="ThreeDots"
            color="#303f9f"
          />
        ) : (
          <ContactsList />
        )}

        {isError && (
          <NotificatiomMessage
            color="red"
            message="Error: Network error. Try later..."
          />
        )}
      </Container>
    </section>
  );
};

export default PhoneBookView;
