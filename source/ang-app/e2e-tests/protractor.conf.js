exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    //'./tests/*.js'
    './tests/userstab.js'
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
