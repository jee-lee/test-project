/*
Contains the URL of the APIs and UI in test.
The configuration is based on the test environment that is configured through the TEST_ENV environment variable.
 */
import 'dotenv/config';

// this can include an array of possible TEST_ENV and does a include check instead.
if (process.env.TEST_ENV.toLowerCase() !== 'sandbox') {
  throw new Error('Requires TEST_ENV to be "sandbox"');
}

// Since only one TEST_ENV is known, these are a hardcoded value for now.
const apiSuperDomain = 'connect-sandbox';
const previewDomain = 'sandbox';

export const apiBaseURL = `https://${apiSuperDomain}.ticketguardian.net`;
export const uiBaseURL = `https://preview.${previewDomain}.protecht.com`;
