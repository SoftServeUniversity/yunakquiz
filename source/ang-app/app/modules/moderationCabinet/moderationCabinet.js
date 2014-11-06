angular.module('yunakQuiz.moderationCabinet', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/moderationCabinet', {
    templateUrl: 'modules/moderationCabinet/moderationCabinet.html',
    controller: 'ModerationCabinetCtrl'
  })
  .when('/admin/moderationCabinet/review/:quiz_id', {
    templateUrl: 'modules/moderationCabinet/review.html',
    controller: 'ReviewCtrl'
  })  
  .when('/admin/moderationCabinet/:state', {
    templateUrl: 'modules/moderationCabinet/moderationCabinet.html',
    controller: 'ModerationCabinetCtrl'
  })
 
}])

.controller('ModerationCabinetCtrl', ['$scope','QuizData', '$routeParams','$http','$location','$modal', function($scope, QuizData, $routeParams, $http, $location,$modal) {

// end of Guest Search controller
  $scope.tab = $routeParams.state || "published";

  $scope.outputData={
    currentPage: 1,
    itemsPerPage: 10,
    searchData:''
  };

  $scope.inputData={};

  $scope.quizUrl = '#/assessments/';



  $scope.updateData = function(data){
    $scope.quizzes = data.quizzes;
    $scope.inputData = data.queryData;
  }

  $scope.searchQuery = function(){
    $scope.outputData.currentPage = 1;
    $scope.queryList();
  };

  $scope.queryList = function() {
    QuizData.queryList($scope.tab, $scope.outputData).success(function(data, status, headers, config) {
        $scope.updateData(data);        
    });
  };

  $scope.deleteQuiz= function(quizId){
    var modalDelete = $modal.open({
      templateUrl: 'modules/personalCabinet/modalDelete.html',
      controller: 'ModalDeleteCtrl',
      size: 'sm'
    });
    modalDelete.result.then(function () {
      QuizData.delete(quizId).success(function(data) {
        $scope.searchQuery();
      });
    });
  };

  
  $scope.queryList();

}])