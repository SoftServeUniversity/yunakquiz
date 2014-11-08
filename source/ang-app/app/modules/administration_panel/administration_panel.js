(function (){
  var  app = angular.module('yunakQuiz.administrationPanel' ,['ngRoute']);

    app.directive('adminPanel', function(){
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/administration_panel.html',
        controller: ['$scope', '$http', function ($scope, $http) {
          $scope.isSelected = function (tab) {
          return $scope.tab ==  tab;
          };
        }]
      }
    });
})();
