var yunakQuizApp = angular.module('yunakQuiz.personalCabinet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/personalCabinet', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'PersonalCabinetCtrl'
  })
  .when('/admin/personalCabinet/profile', {
    templateUrl: 'modules/personalCabinet/profile.html',
    controller: 'PersonalCabinetProfileCtrl'
  })
  .when('/admin/personalCabinet/:state', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'PersonalCabinetCtrl'
  })   
}])

.controller('PersonalCabinetCtrl', ['$scope','QuizData', '$routeParams','$http','$location', function($scope, QuizData, $routeParams, $http, $location) {
  
  $scope.tab = $routeParams.state || "published";
  $scope.search={};
  $scope.quizUrl = '#/assessments/';

  $scope.getAll = function(){
    QuizData.getAll($scope.tab).success(function(data) {
        $scope.quizzes = data;
    });
  };

  $scope.quizSearch = function(){
    QuizData.getSearch($scope.tab,$scope.search).success(function(data) {
        console.log(data);
        $scope.quizzes = data;
    });
  };

  $scope.deleteQuiz= function(quizId){
    QuizData.delete(quizId).success(function(data) {
      $scope.getAll();
  });
  };

  $scope.getAll();
}])

.controller('PersonalCabinetProfileCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {

  $scope.tab = 'profile';

}]);
