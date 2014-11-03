var yunakQuizApp = angular.module('yunakQuiz.personalCabinet', ['ngRoute', 'ui.bootstrap'])

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

.controller('PersonalCabinetCtrl', ['$scope','QuizData', '$routeParams','$http','$location','$modal', function($scope, QuizData, $routeParams, $http, $location,$modal) {
  
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

    // modalInstance.result.then(function (selectedItem) {
    //   $scope.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });

  //   QuizData.delete(quizId).success(function(data) {
  //     $scope.searchQuery();
  // });
  };

  
  $scope.queryList();
}])
.controller('ModalDeleteCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])

.controller('PersonalCabinetProfileCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {

  $scope.tab = 'profile';

}]);
