exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    // './tests/*.js'
    // './tests/quiz.js',
    './tests/quizCreate.js',
    // './tests/quizEdit.js',
    // './tests/review.js',
    // './tests/moderationCabinet.js'



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
