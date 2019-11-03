const message = require('../response-messages');
const passport = require('passport');
const url = require('url');

const authenticate =  (req, res) => {
  try {
    passport.authenticate('github')(req, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(message.status500);
  }
}

const authCallback = (req, res, next) => {
  try {
    passport.authenticate('github', (err, user, info) => {
      if (err) { return next(err);}
      if (!user) { return res.redirect("/auth");}
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || "/");
      });

    })(req, res, next);

  } catch(err) {
    console.log(err.message);
    res.status(500).json(message.status500);
  }
}

module.exports = { authenticate, authCallback };
