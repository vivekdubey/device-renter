const message = require('../response-messages');
var passport = require('passport');

const authenticate =  ( request, response ) => {
  try {
    passport.authenticate('github');
    response.status(200).json({message: 'Successful'});
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}
