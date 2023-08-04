import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to={'/userprofile'}>User Profile</Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to={'/'}>Home</Link>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
