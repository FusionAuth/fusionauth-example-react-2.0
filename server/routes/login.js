const express = require('express');
const router = express.Router();
const config = require('../../client/src/config');
const crypto = require('crypto');

router.base64URLEncode = function (str) {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

router.get('/', (req, res) => {
  var state = router.base64URLEncode(crypto.randomBytes(64));
    req.session.oauthState = state;
  res.redirect(`http://localhost:${config.fusionAuthPort}/oauth2/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&response_type=code&state=${state}`);

});
//
router.get('/oauth-callback', (req, res, next) => {
 // Verify the state
 const reqState = req.query.state;
 const state = req.session.oauthState;
 if (reqState !== state) {
 res.redirect('/', 302); // Start over
 return;
 }
});


module.exports = router;
