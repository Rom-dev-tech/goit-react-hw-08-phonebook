import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { contactsSelectors } from 'redux/phonebook';

const Сounter = ({ title }) => {
  const totalContactsCount = useSelector(
    contactsSelectors.getTotalContactsCount
  );

  return (
    <div style={{ fontSize: '2rem' }}>
      {title} {totalContactsCount}
    </div>
  );
};

Сounter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Сounter;
