import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from './auth.service';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [course, setCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCampus = (e) => setCampus(e.target.value);
  const handleCourse = (e) => setCourse(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(username, password, campus, course);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignupSubmit}>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <label>Campus: </label>
          <input
            type="text"
            name="campus"
            value={campus}
            onChange={handleCampus}
          />
          <label>Course: </label>
          <input
            type="text"
            name="course"
            value={course}
            onChange={handleCourse}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="signup-right">
        <h2>Hello!!</h2>
        <h3>Welcome to IronProfile!</h3>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
