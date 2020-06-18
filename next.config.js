/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const config = require('./config');

module.exports = withCSS(
  withSass({
    serverRuntimeConfig: { ...config.server },
    publicRuntimeConfig: { ...config.client, version: config.version }
  })
);
