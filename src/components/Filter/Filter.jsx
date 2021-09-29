import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from 'redux/phonebook';
import 'components/Filter/Filter.scss';

const Filter = () => {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  const onChange = (event) =>
    dispatch(contactsActions.changeFilter(event.currentTarget.value));

  return (
    <div className="filter__wrapper">
      <label className="filter__label">
        <span className="filter__name">Find contacts by name or number</span>
        <input
          className="filter__input"
          placeholder="Enter name or number"
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Filter;
