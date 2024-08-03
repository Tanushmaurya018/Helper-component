const authService = require('../services/auth.service');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const token = await authService.register(name, email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { register, login };

