exports.config = {
  allScriptsTimeout: 11000,

  specs: [
  //  './test/angular-mocks.js',
    './test/category_2.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  }
};