import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { logIn } from './auth.service';

function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUserName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { authToken } = await logIn(username, password);

      await logIn(username, password);
      // Save the token in the localStorage.
      storeToken(authToken);

      // Verify the token by sending a request
      // to the server's JWT validation endpoint.
      await authenticateUser(); // <== ADD
      navigate('/userprofile');
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
          <label>Password:</label>
          <input
            autoComplete=""
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="login-right">
        <h2>Hello!</h2>
        <h3>Awesome to have at IronProfile again!</h3>
        <p>Don&apos;t have an account yet?</p>
        <Link to={'/signup'}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
