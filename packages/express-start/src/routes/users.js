const express = require('express');
const router = express.Router();
const { getUserRole } = require('../models/user.model')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const roles = await getUserRole()
  res.render('users', {roles});
});

module.exports = router;
