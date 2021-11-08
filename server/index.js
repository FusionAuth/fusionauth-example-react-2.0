const userRoute = (require('./routes/user'));
const loginRoute = (require('./routes/login'));
const logoutRoute = (require('./routes/logout'));
const oauthCallbackRoute = (require('./routes/oauth-callback'));
const express = require('express');
const cors = require('cors');
const config = require('../client/src/config');
const session = require('express-session');
const PORT = process.env.PORT || 3001;

// configure Express app and install the JSON middleware for parsing JSON bodies
const app = express();
app.use(express.json());

app.use(session(
  {
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto',
      httpOnly: true,
      maxAge: 3600000
    }
  })
);

app.use(cors({
  origin: true,
  credentials: true
}));

// use routes
app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/oauth-callback', oauthCallbackRoute);
app.use('/logout', logoutRoute);
// start server
app.listen(config.serverPort, () => console.log(`FusionAuth example app listening on port ${config.serverPort}.`));
