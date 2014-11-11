exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './tests/*.js'
    //'./tests/signup.js'
    //'./tests/login.js'


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
