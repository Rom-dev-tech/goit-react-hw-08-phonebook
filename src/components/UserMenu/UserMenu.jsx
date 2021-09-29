import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import defaultAvatar from './default-avatar.png';
import 'components/UserMenu/UserMenu.scss';

const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector(authSelectors.getUseremail);
  const avatar = defaultAvatar;

  return (
    <div className="usermenu__wrapper">
      <img src={avatar} alt="" width="32" className="usermenu__avatar" />
      <span className="usermenu__name">Welcome, {email}</span>
      <button
        className="usermenu__buuton"
        type="button"
        onClick={() => dispatch(authOperations.logOut())}
      >
        Sign out
      </button>
    </div>
  );
};

export default UserMenu;
