const router = require('express').Router();
const usersRoutes = require('./users.routes');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/users', usersRoutes);

module.exports = router;
