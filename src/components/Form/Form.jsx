import PropTypes from 'prop-types';
import s from 'components/Form/Form.module.scss';

const Form = ({ onSubmit, inputName, inputNumber, children }) => {
  return (
    <form className={s.form} onSubmit={onSubmit}>
      <label className={s.label}>
        <span className={s.form__name}>Name</span>
        <input
          {...inputName.bind}
          className={s.input}
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Nikoly Mosalov"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
          required
        />
      </label>

      <label className={s.label}>
        <span className={s.form__name}>Number</span>
        <input
          {...inputNumber.bind}
          className={s.input}
          autoComplete="off"
          type="tel"
          name="number"
          placeholder="+38(073) 777 77 77"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="The phone number must be digits and can contain spaces, dashes, parentheses and can start with + "
          required
        />
      </label>
      {children}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputName: PropTypes.object.isRequired,
  inputNumber: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Form;
