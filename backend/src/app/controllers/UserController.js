const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const newUser = req.body;
  User.create(newUser, (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send('User registered!');
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(401).send('User not found');
    
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Server error');
      if (!isMatch) return res.status(401).send('Invalid password');

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;