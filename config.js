const dotenv = require('dotenv');
const cfg = {};

if (process.env.NODE_ENV !== 'test') {
  dotenv.config({ path: '.env' });
} else {
  dotenv.config({ path: '.env.example', silent: true });
}

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = 'AC9190dc423fd5c18383777fa9525652b6';

cfg.twimlAppSid = 'AP1fc1bbdd2c354a3ead7b8638b99be5e6';
cfg.callerId = '+19474652764';

cfg.apiKey = 'SKe5242ee3bbdd625df166b2feaadca6b6';
cfg.apiSecret = 'pt58SUDN7A9U0xB0dnwvlUxUjsiS1bzd';

// Export configuration object
module.exports = cfg;
