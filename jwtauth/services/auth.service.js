const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const register = async (name, email, password) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = { user: { id: user.id } };

  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });
};

const login = async (email, password) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  const payload = { user: { id: user.id } };

  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 });
};

module.exports = { register, login };

