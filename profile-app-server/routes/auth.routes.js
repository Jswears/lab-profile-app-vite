const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();
const saltRounds = 10;

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, campus, course, image } = req.body;

    if (password === '' || username === '') {
      return res.status(400).json({ message: 'Provide password and username' });
    }

    //REGEX for user
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: 'Provide valid username' });
    }

    //REGEX for password
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
      });
    }

    // Check if user with same username exists
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //If username unique, hash password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //Create new user in database
    const createdUser = await User.create({
      password: hashedPassword,
      username,
      campus,
      course,
      image: image || '',
    });

    const {
      username: createdUsername,
      campus: createdCampus,
      course: createdCourse,
      image: createdImage,
      _id: createdId,
    } = createdUser;

    //New object without password
    const user = {
      username: createdUsername,
      campus: createdCampus,
      course: createdCourse,
      image: createdImage,
      _id: createdId,
    };
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST	/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username === '' || password === '') {
      return res.status(400).json({ message: 'Provide username and password' });
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, username, campus, course, image } = foundUser;

      const payload = { _id, username, campus, course, image };

      // Create and sign the token
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '6h',
      });

      // Send the token as the response
      return res.status(200).json({ authToken });
    } else {
      return res.status(401).json({ message: 'Unable to authenticate user' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// GET	/auth/verify
router.get('/verify', isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  return res.status(200).json(req.payload);
});
// PUT	/api/users

// GET	/api/users

// POST	/api/upload

module.exports = router;
