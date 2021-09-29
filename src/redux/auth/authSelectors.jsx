const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getUseremail = (state) => state.auth.user.email;

const getErrorMessage = (state) => state.auth.error.message;

const getIsFetchingCurrent = (state) => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUseremail,
  getIsFetchingCurrent,
  getErrorMessage,
};
export default authSelectors;
