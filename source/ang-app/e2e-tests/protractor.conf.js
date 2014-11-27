exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    // './tests/*.js',
    // './tests/HomePage.js',
    // './tests/aboutUs.js',
    // './tests/adminPanAboutUs.js',
    // './tests/adminPanel.js',
    // './tests/adminPanelCatEditDelCreate.js',
    './tests/contactPage.js',
    // './tests/*.js'
    //'./tests/signup.js'
    //'./tests/login.js'
    //'./tests/guest-search-test.js'
    //'./tests/profile.js'


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
