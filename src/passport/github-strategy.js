const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const { githubCallbackURL, githubEnterpriseHostName } = require('../config');

const enterpriseConfig = {
  authorizationURL: `https://${githubEnterpriseHostName}/login/oauth/authorize`,
  tokenURL: `https://${githubEnterpriseHostName}/login/oauth/access_token`,
  userProfileURL: `https://${githubEnterpriseHostName}/api/v3/user`
}

const getStrategyConfig = () => {
  const defaultConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: githubCallbackURL
  }
  return (process.env.GITHUB == "enterprise") ? Object.assign(defaultConfig, enterpriseConfig) : defaultConfig;
}
const strategy = new Strategy( getStrategyConfig(),
  (accessToken, refreshToken, profile, cb) => {
  return cb(null, profile);
});

module.exports = {strategy};
