import PropTypes from 'prop-types';

import 'components/Button/Button.scss';

const Button = ({ type, discription, onClick, variant, disabled }) => {
  return (
    <button
      className={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {discription}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  discription: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
