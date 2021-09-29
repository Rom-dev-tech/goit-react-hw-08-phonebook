import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { authSelectors } from 'redux/auth';

const PrivateRoute = ({ children, redirectTo = '/', ...routeProps }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
