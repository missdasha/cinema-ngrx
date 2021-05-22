const JWT = require('jsonwebtoken');
const User = require('../models/User');
const OperationalError = require('../helpers/OperationalError');
const { EMAIL_IS_ALREADY_IN_USE } = require('../config/constants');
require('dotenv').config();

const signToken = (user) => {
  return JWT.sign({
    iss: 'ApiAuth',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const foundUser = await User.findOne({ email });
      if (foundUser) {
        return next(new OperationalError(EMAIL_IS_ALREADY_IN_USE, 403));
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      const token = signToken(newUser);
      res.status(200).json({ token });
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const token = signToken(req.user);
      res.status(200).json({ token, name: req.user.name, id: req.user._id });
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  },

  secret: async (req, res, next) => {
    try {
      res.json({ secret: "resource" });
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  }
};
