'use strict';

angular.module('yunakQuiz.version', [
  'yunakQuiz.version.interpolate-filter',
  'yunakQuiz.version.version-directive'
])

.value('version', '0.1');
