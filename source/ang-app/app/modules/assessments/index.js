'use strict';

angular.module('yunakQuiz.assessments', ['ngRoute'])

.config(    ['$routeProvider',  require('./assessments_routes.js') ])
.controller( 'AssessmentsCtrl', require('./assessments_controller.js') )
.factory(    'AssessmentsSrvc', require('./assessments_service.js') );