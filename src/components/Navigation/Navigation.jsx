import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelectors } from 'redux/auth';
import 'components/AuthNav/AuthNav.scss';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <nav>
      <NavLink to="/" exact className="link" activeClassName="activeLink">
        Home
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink
            to="/contacts"
            exact
            className="link"
            activeClassName="activeLink"
          >
            Phonebook
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
