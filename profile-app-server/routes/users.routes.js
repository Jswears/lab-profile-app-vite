const router = require('express').Router();
const User = require('../models/User.model');

// PUT /api/users {image}
router.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { image } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image || '' },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

// GET currentuser by Id
router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const oneUser = await User.findById(userId);
    if (!oneUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(oneUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
