/* eslint-disable import/prefer-default-export */
import Snoowrap from 'snoowrap';

export const snoowrapClient = new Snoowrap({
  userAgent: `${process.env.REACT_APP_USER_AGENT}`,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
});
