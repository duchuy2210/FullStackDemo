import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.scss';
const Navbar = () => {
  // const [user, setUSer] = useState('');
  //Lấy data từ store redux
  const user = useSelector((state)=>{
    // console.log(state.authReducer.login.currentUser)
    return state.auth.login.currentUser
  })
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
          <p className="navbar-user">
            {user.admin?"Admin":"Client"}
          </p>
          <Link to="/logout" className="navbar-logout">
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
