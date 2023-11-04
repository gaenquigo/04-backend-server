const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('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');

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '123644598436-gadk0d99pthdpna56vmip3nq0a7b7e50.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  //const userid = payload['sub'];

  return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = {
    googleVerify
}