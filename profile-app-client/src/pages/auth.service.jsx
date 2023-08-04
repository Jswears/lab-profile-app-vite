/* Create an `auth.service.js` file, where you will have the functions that abstract the axios requests to your REST API. Create the following methods:

- **signUp** that makes a `POST` request to the server endpoint `/auth/signup` passing _username_, _password_, _campus_ and _course_ info,
- **logIn** that makes a `POST` request to the server endpoint `/auth/login` passing _username_ and _password_,
- **verifyToken** that makes a `GET` request to the server endpoint `/auth/verify` to check if a user is logged in.
- **uploadPhoto** that makes a `POST` request to the server endpoint `/api/upload` and sends the _file_,
- **getCurrentUser** that makes a `GET` request to the server endpoint `/api/user` to retrieve the current user data,
- **editUser** that makes a `PUT` request to the server endpoint `/api/user` passing _username_, _campus_, _course_ and _image_.*/

import axios from 'axios';

const BASE_URL = 'http://localhost:5004';

export const signUp = async (username, password, campus, course) => {
  try {
    const requestBody = { username, password, campus, course, image: '' };
    const response = await axios.post(`${BASE_URL}/auth/signup`, requestBody);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logIn = async (username, password) => {
  try {
    const requestBody = { username, password };
    const response = await axios.post(`${BASE_URL}/auth/login`, requestBody);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPhoto = async (userId, newImage, storedToken) => {
  try {
    const response = await axios.put(
      `http://localhost:5004/api/users/${userId}`,
      newImage,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (_id, storedToken) => {
  try {
    const response = await axios.get(`http://localhost:5004/api/users/${_id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return response;
  } catch (error) {
    console.log();
  }
};
