import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import IsAnon from './components/isAnon';
import UserProfilePage from './pages/UserProfilePage';
import IsPrivate from './components/isPrivate';
import AddPhotoPage from './pages/AddPhotoPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <IsAnon>
              <HomePage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path={'/userprofile'}
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/userprofile/:userId" element={<AddPhotoPage />} />
        <Route to={'*'} element={<p>404 Error</p>} />
      </Routes>
    </>
  );
}

export default App;
