angular.module('yunakQuiz.personalCabinet', ['ngRoute', 'flow'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/personalCabinet', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'CabinetCtrl',
    queryFn: "queryList"
  })
  .when('/admin/personalCabinet/profile', {
    templateUrl: 'modules/personalCabinet/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  })
  .when('/admin/personalCabinet/:state', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'CabinetCtrl',
    queryFn: "queryList"
  })   
}])

.controller('CabinetCtrl', ['$scope','QuizData', '$routeParams','$http','$location','$modal', '$route', function($scope, QuizData, $routeParams, $http, $location,$modal, $route) {
  var queryFn = $route.current.queryFn;
  $scope.tab = $routeParams.state || "published";

  $scope.outputData={
    currentPage: 1,
    itemsPerPage: 10,
    searchData:'',
    categoryFilter: []
  };

  $scope.quizUrl = '#/assessments/';


  $scope.searchQuery = function(){
    $scope.outputData.currentPage = 1;
    $scope.queryList();
  };

  $scope.clearInput = function() {
    $scope.outputData.searchData='';
    $scope.searchQuery();
  };

  $scope.queryList = function() {
    QuizData[queryFn]($scope.tab, $scope.outputData)
      .success(function(data, status, headers, config) {
        $scope.updateData(data);        
      })
      .error(function(data){
        $scope.error = data;
      });
  };

  $scope.updateData = function(data){
    $scope.quizzes = data.quizzes;
    $scope.totalItems = data.totalItems;
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

  
  $scope.categoryFilter = function(){
    $scope.outputData.categoryFilter = $scope.searchRequest.categories_id;
    $scope.searchQuery();
  };

  
  $scope.searchQuery();

}])
.controller('ModalDeleteCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {
  
  $scope.clearMsg = function(){
    if($scope.errorMsg) $scope.deleteConfirm = "";
    $scope.errorMsg ="";
  };

  $scope.ok = function () {
    var password = 1911;
    if($scope.deleteConfirm == password){
      $scope.clearMsg();
      $modalInstance.close();
    }
    else{$scope.errorMsg = "Невірний пароль!"}
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
