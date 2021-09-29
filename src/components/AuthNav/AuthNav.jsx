import React from 'react';
import { NavLink } from 'react-router-dom';
import 'components/AuthNav/AuthNav.scss';

const AuthNav = () => {
  return (
    <div>
      <NavLink
        to="/register"
        exact
        className="link"
        activeClassName="activeLink"
      >
        Sign up
      </NavLink>

      <NavLink to="/login" exact className="link" activeClassName="activeLink">
        Sign in
      </NavLink>
    </div>
  );
};

export default AuthNav;
