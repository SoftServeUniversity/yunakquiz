exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './test/category_2.js'
    //'./test/HomePage.js'
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
