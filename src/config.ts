export default {
  inDev: process.env.NODE_ENV === 'development',
  clientId: process.env.KINDE_BACKEND_CLIENT_ID,
  kindeUrl: process.env.KINDE_URL,
  kindeSecret: process.env.KINDE_CLIENT_SECRET,
  frontendUrl: process.env.SITE_URL,
  unAuthorizedUrl: process.env.UNAUTHORIZED_URL,
};
