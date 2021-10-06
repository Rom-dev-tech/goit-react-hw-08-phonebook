import PropTypes from 'prop-types';

import 'components/Button/Button.scss';

const Button = ({ type, discription, onClick, variant }) => {
  return (
    <button className={variant} type={type} onClick={onClick}>
      {discription}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  discription: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default Button;
