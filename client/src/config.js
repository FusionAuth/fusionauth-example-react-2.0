const config = {
  // OAuth info (copied from the FusionAuth admin panel)
  clientID: '48f671cc-1627-41b5-aed1-260b80a9f742',
  clientSecret: 'pqQj3uOj7q7BLe0ImvgSxCvKUTuczAth1vjAmkntve8',
  redirectURI: 'http://localhost:3001/oauth-callback',
  applicationID: '48f671cc-1627-41b5-aed1-260b80a9f742',

  // our FusionAuth api key
  apiKey: 'bf69486b-4733-4470-a592-f1bfce7af580',

  // ports
  clientPort: 3000,
  serverPort: 3001,
  fusionAuthPort: 9011
};

module.exports = config;
