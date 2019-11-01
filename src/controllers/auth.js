const message = require('../response-messages');
const passport = require('passport');

const authenticate =   ( request, response ) => {
  try {
    console.log("in authenticate");
  } catch (err) {
    console.log(err.message);
    response.status(500).json(message.status500);
  }
}

module.exports = { authenticate };
