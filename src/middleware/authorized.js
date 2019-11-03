const users = require('../models/users');

const isAuthorized = async (req, res, next) => {
  if(await users.userExists(req.user.username)) {
    next();
  } else {
    return res.redirect('/');
  }
}

module.exports = { isAuthorized };
