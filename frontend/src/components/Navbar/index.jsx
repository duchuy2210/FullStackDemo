import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.scss';
import { logOut } from '../../redux/apiRequest';
const Navbar = () => {
  // const [user, setUSer] = useState('');
  //Lấy data từ store redux
  const user = useSelector(state => {
    // console.log(state.authReducer.login.currentUser)
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();
  const id = user?._id;
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken);
  };
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        {' '}
        Home{' '}
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.userName} </span>{' '}
          </p>
          <p className="navbar-user">{user.admin ? 'Admin' : 'Client'}</p>
          <Link to="/logout" className="navbar-logout" onClick={handleLogout}>
            {' '}
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            {' '}
            Login{' '}
          </Link>
          <Link to="/register" className="navbar-register">
            {' '}
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
