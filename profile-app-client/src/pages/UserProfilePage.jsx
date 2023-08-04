import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';
import { getCurrentUser } from './auth.service';

function UserProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem('authToken');

  const getUserInfo = async () => {
    const { _id } = user;
    try {
      const response = await getCurrentUser(_id, storedToken);
      setUserData(response.data);
    } catch (error) {
      console.log('There has been an error');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="user-container">
      <div className="user-left">
        <h1>Profile</h1>
        {userData && (
          <div>
            <p>Username:</p>
            <h3>{userData.username}</h3>
            <p>Campus:</p>
            <h3> {userData.campus}</h3>
            <p>Course:</p>
            <h3> {userData.course}</h3>
            <button onClick={logOutUser}>Logout</button>
          </div>
        )}
      </div>
      {userData ? (
        <div className="user-right">
          <img
            src={userData.image}
            alt={userData.username}
            style={{ width: '200px', height: '200px' }}
          />
          <Link to={`/userprofile/${user._id}`}>Edit!</Link>
          <p>Whatever</p>
        </div>
      ) : (
        'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'
      )}
    </div>
  );
}

export default UserProfilePage;
