'use strict';

angular.module('yunakQuiz.personalCabinet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/personalCabinet', {
    templateUrl: 'modules/personalCabinet/personalCabinet_index.html',
    controller: 'PersonalCabinetCtrl',
    controllerAs: 'cab'
  });
}])

.controller('PersonalCabinetCtrl', [function() {

}]);