exports.config = {
  allScriptsTimeout: 20000,

  specs: [
    // './tests/*.js'
    './tests/login.js'
    //'./tests/signup.js'

  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
