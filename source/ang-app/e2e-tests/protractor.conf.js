exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './features/*.feature'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'cucumber',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
