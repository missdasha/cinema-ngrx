const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/user');

require('../config/passport.js');

router.post('/register', validateBody(schemas.authSchema), UsersController.signUp);

router.post(
  '/login', 
  validateBody(schemas.authSchema), 
  passport.authenticate('local', { session: false }), 
  UsersController.signIn
);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).end();
});

router.get('/validate_token', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  try {
    res.status(200).json({ status: 'OK'});
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/check_role', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  try {
    res.status(200).json({ role: req.user.role});
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
