const config = {
  // OAuth info (copied from the FusionAuth admin panel)
  clientID: '85a03867-dccf-4882-adde-1a79aeec50df',
  clientSecret: '6HvlAe28V4PL9OEKJ0VlZ6ZsEAluEsZHVFYKuoLAr1U',
  redirectURI: 'http://localhost:3001/oauth-callback',
  applicationID: '85a03867-dccf-4882-adde-1a79aeec50df',

  // our FusionAuth api key
  apiKey: 'bf69486b-4733-4470-a592-f1bfce7af580',

  // ports
  clientPort: 3000,
  serverPort: 3001,
  fusionAuthPort: 9011
};

module.exports = config;
