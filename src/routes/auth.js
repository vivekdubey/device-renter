const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

const getUserData = (req) => {
  const token = Object.keys(req.sessionStore.sessions)[0];
  return JSON.parse(req.sessionStore.sessions[token]).passport.user;
}

authRouter.get('/', passport.authenticate('github'));

authRouter.get('/success',  (req, res) => {
  res.status(200).json(getUserData(req));
});

authRouter.get('/callback',
  (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/devices' })(req, res, next);
  },(req, res) => {
    res.redirect('/auth/success');
  });

module.exports = authRouter;
