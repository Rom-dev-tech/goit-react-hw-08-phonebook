import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import AppBar from 'components/AppBar';
import NotificatiomMessage from 'components/NotificatiomMessage';
import Loader from 'react-loader-spinner';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import { authOperations, authSelectors } from 'redux/auth';

const HomeView = lazy(() => import('views/HomeView/HomeView'));
const RegisterView = lazy(() => import('views/RegisterView/RegisterView'));
const LoginView = lazy(() => import('views/LoginView/LoginView'));
const ContactsView = lazy(() => import('./views/PhoneBookView/PhoneBookView'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isFetchingCurrentUser ? (
        <Loader style={{ textAlign: 'center' }} type="Hearts" color="#03a9f4" />
      ) : (
        <>
          <AppBar />
          <Switch>
            <Suspense fallback={<NotificatiomMessage message={'Loading...'} />}>
              <PublicRoute exact path="/">
                <HomeView />
              </PublicRoute>

              <PublicRoute exact path="/register" restricted>
                <RegisterView />
              </PublicRoute>

              <PublicRoute
                exact
                path="/login"
                redirectTo="/contacts"
                restricted
              >
                <LoginView />
              </PublicRoute>

              <PrivateRoute path="/contacts" redirectTo="/login">
                <ContactsView />
              </PrivateRoute>
            </Suspense>
          </Switch>
        </>
      )}
    </>
  );
}
