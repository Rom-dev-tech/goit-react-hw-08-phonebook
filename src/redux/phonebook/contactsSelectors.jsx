import { createSelector } from '@reduxjs/toolkit';

export const getContacts = (state) => state.contacts.items;

export const getFilter = (state) => state.contacts.filter;

export const getLoading = (state) => state.contacts.loading;

export const getError = (state) => state.contacts.error;

export const getTotalContactsCount = (state) => {
  const contacts = getContacts(state);

  return contacts.length;
};

export const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) || number.includes(filter)
    );
  }
);
