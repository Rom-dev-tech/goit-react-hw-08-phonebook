import { createSlice } from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  error: false,
};

const extraReducersParams = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.error = false;
};

const extraReducersParamsForError = (state, action) =>
  (state.error = action.error);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      extraReducersParams(state, action);
    },

    [authOperations.register.rejected](state, action) {
      extraReducersParamsForError(state, action);
    },

    [authOperations.logIn.fulfilled](state, action) {
      extraReducersParams(state, action);
    },

    [authOperations.logIn.rejected](state, action) {
      extraReducersParamsForError(state, action);
    },

    [authOperations.logOut.fulfilled](state) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = initialState.isLoggedIn;
      state.error = initialState.error;
    },

    [authOperations.logOut.rejected](state, action) {
      extraReducersParamsForError(state, action);
    },

    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = !initialState.isFetchingCurrentUser;
    },

    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = !initialState.isLoggedIn;
      state.isFetchingCurrentUser = initialState.isFetchingCurrentUser;
      state.error = initialState.error;
    },

    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = initialState.isFetchingCurrentUser;
    },
  },
});

export default authSlice.reducer;
