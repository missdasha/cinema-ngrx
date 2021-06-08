const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const OperationalError = require('../helpers/OperationalError');
const { INVALID_CREDENTIALS_MESSAGE } = require('../config/constants');
require('dotenv').config();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(new OperationalError(INVALID_CREDENTIALS_MESSAGE, 401), false);
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return done(new OperationalError(INVALID_CREDENTIALS_MESSAGE, 401), false);
    }
    return done(null, user);
  }
  catch (e) {
    return done(e, false);
  }
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: '1d'
  }
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }
  catch (e) {
    console.log(e);
    return done(e, false);
  }
}));
