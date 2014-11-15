(function (){
  var  app = angular.module('yunakQuiz.administrationPanel',
    ['ngRoute','yunakQuiz.aboutusTab', 'yunakQuiz.administrationTab',
    'yunakQuiz.blacklistTab', 'yunakQuiz.faqTab', 'yunakQuiz.quizzescategoriesTab',
     'yunakQuiz.userTab','yunakQuiz.permission']);

    app.directive('adminPanel', ['getTabTemplates', '$location', function(getTabTemplates,$location){
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/administration_panel.html',
        controller: ['$scope', '$http', function ($scope, $http) {
          $scope.tabs = {};

          getTabTemplates.getResponse().then(function(data){
            $scope.tabs = data;
            if(data.length > 0){
              $scope.results = data;
            }
            else{
              $location.path( "/404" );
            };
          },function() {
            $location.path( "/404" );
            }
          );
          $scope.isSelected = function (tab,curent) {
            if($scope.tabs){
              return curent ===  tab;
            }
            else return false;
            };
        }]
      }
    }]);
})();
