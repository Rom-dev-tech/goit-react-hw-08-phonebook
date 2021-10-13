import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as contactsActions from './contactsActions';

const items = createReducer([], {
  [contactsActions.fetchContactsSuccess]: (_, { payload }) => payload,

  [contactsActions.addContactSuccess]: (state, { payload }) => [
    ...state,
    payload,
  ],

  [contactsActions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),

  [contactsActions.editContactSuccess]: (state, { payload }) => {
    return [...state].map((contact) => {
      if (contact.id === payload.id) {
        return payload;
      }
      return contact;
    });
  },
});

const filter = createReducer('', {
  [contactsActions.changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [contactsActions.fetchContactsRequest]: () => true,
  [contactsActions.fetchContactsSuccess]: () => false,
  [contactsActions.fetchContactsError]: () => false,
  [contactsActions.addContactRequest]: () => true,
  [contactsActions.addContactSuccess]: () => false,
  [contactsActions.addContactError]: () => false,
  [contactsActions.deleteContactRequest]: () => true,
  [contactsActions.deleteContactSuccess]: () => false,
  [contactsActions.deleteContactError]: () => false,
  [contactsActions.editContactRequest]: () => true,
  [contactsActions.editContactSuccess]: () => false,
  [contactsActions.editContactError]: () => false,
});

const error = createReducer(null, {
  [contactsActions.fetchContactsRequest]: () => false,
  [contactsActions.fetchContactsSuccess]: () => false,
  [contactsActions.fetchContactsError]: () => true,
  [contactsActions.addContactRequest]: () => false,
  [contactsActions.addContactSuccess]: () => false,
  [contactsActions.addContactError]: () => true,
  [contactsActions.deleteContactRequest]: () => false,
  [contactsActions.deleteContactSuccess]: () => false,
  [contactsActions.deleteContactError]: () => true,
  [contactsActions.editContactRequest]: () => false,
  [contactsActions.editContactSuccess]: () => false,
  [contactsActions.editContactError]: () => true,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});
