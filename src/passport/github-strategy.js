const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const { githubCallbackURL } = require('../config');

module.exports = function () {
  passport.use(new Strategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorizationURL: `https://${hostName}/login/oauth/authorize`,
      tokenURL: `https://${hostName}/login/oauth/access_token`,
      userProfileURL: `https://${hostName}/api/v3/user`,
      callbackURL: githubCallbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  ));
}
