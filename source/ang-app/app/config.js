angular.module('yunakQuiz')

.constant('CONFIG', {
  'MIN_ASWERS_QTY' : 2,
  'MIN_QUESTIONS_QTY' : 1,
  'SCORE_ROUND': 2,
  'DEL_PASSWORD':'1911',
  'BASE_URL': 'http://localhost:9292',
  'DATE_FORMAT':'dd/MM/yy HH:mm'
})

.constant('paginationConfig', {
  items_per_page:[5,10,25,50],
  boundaryLinks: true,
  directionLinks: true,
  maxSize : 10,
  rotate: false,
  firstText: '≪',
  previousText: '<',
  nextText: '>',
  lastText: '≫'
})