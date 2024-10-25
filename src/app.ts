// app.ts - Creates the express app and defines routes.

// Import dependencies
import express, { Request } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { GrantType } from '@kinde-oss/kinde-node-express';
import globalConfig from './config';

const { inDev } = globalConfig;

// Import the routers for the app
import users from './api/users';
import challenges from './api/challenges';
import completions from './api/completions';

// Create the app
const app = express();

// Use express json middleware for all routes
app.use(express.json());
app.use(express.static('public'));
app.use(cors<Request>());

// Set debug based on environment variables
const DEBUG = process.env.DEBUG?.toLowerCase() === 'true' || false;

// Set logging level based on debug mode and add morgan middleware to app
const logging_level = DEBUG ? 'dev' : 'tiny';
app.use(morgan(logging_level));

// Config settings for Kinde
if (!inDev) {
  const { setupKinde } = require('@kinde-oss/kinde-node-express');

  const config = {
    clientId: globalConfig.clientId,
    issuerBaseUrl: globalConfig.kindeUrl,
    siteUrl: globalConfig.frontendUrl, //SiteUrl is refering to the frontend's url
    secret: globalConfig.kindeSecret,
    redirectUrl: globalConfig.frontendUrl, //Where to send users to once authenticated
    scope: 'openid profile email',
    grantType: GrantType.AUTHORIZATION_CODE, //or CLIENT_CREDENTIALS or PKCE
    unAuthorisedUrl: globalConfig.unAuthorizedUrl, //Where to send users to if theyre not authenticated
    postLogoutRedirectUrl: globalConfig.frontendUrl, //Where to send users to when they logout
  };

  setupKinde(config, app);
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Use the users router in the corresponding route.
app.get('/api/', (req, res) => {
  console.log('in /api');
  res.json({ message: 'Welcome to the API' });
});

app.use('/api/v1/users', users);

app.use('/api/v1/challenges', challenges);

app.use('/api/v1/completions', completions);

// Export the app for the server to run.
export default app;
