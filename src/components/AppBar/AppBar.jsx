import { useSelector } from 'react-redux';
import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import AuthNav from 'components/AuthNav';
import Container from 'components/Container';
import { authSelectors } from 'redux/auth';
import 'components/AppBar/AppBar.scss';

const AppBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <div className="header__wrapper">
      <Container>
        <header className="header">
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
      </Container>
    </div>
  );
};

export default AppBar;
