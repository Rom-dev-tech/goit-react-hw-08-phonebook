import React from 'react';
import PropTypes from 'prop-types';
import 'components/IconButton/IconButton.scss';

const IconButton = ({ children, onClick, ...allyProps }) => (
  <button
    type="button"
    className="icon__button"
    onClick={onClick}
    {...allyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default IconButton;
