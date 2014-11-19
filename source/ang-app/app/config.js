angular.module('yunakQuiz')

.constant('CONFIG', {
  'MIN_ASWERS_QTY' : 2,
  'BASE_URL': 'http://localhost:9292'
})

.constant('paginationConfig', {
  boundaryLinks: true,
  directionLinks: true,
  maxSize : 10,
  rotate: false,
  firstText: '≪',
  previousText: '<',
  nextText: '>',
  lastText: '≫'
})