var express = require('express');
var authRouter = express.Router();
const passport = require('passport');

authRouter.get('/', passport.authenticate('github'));

authRouter.get('/success',  (req, res) => {
  console.log(req);
  res.status(200).json({message: 'success'});
});


authRouter.get('/callback',
  function(req, res, next) {
    passport.authenticate('github', { failureRedirect: '/devices' })(req, res, next);
  },
  function(req, res) {
    res.redirect('/auth/success');
  });

module.exports = authRouter;
