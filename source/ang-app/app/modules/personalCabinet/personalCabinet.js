angular.module('yunakQuiz.personalCabinet', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/personalCabinet', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'CabinetCtrl'
  })
  .when('/admin/personalCabinet/profile', {
    templateUrl: 'modules/personalCabinet/profile.html',
    controller: 'PersonalCabinetProfileCtrl'
  })
  .when('/admin/personalCabinet/:state', {
    templateUrl: 'modules/personalCabinet/quizesList.html',
    controller: 'CabinetCtrl'
  })   
}])

.controller('CabinetCtrl', ['$scope','QuizData', '$routeParams','$http','$location','$modal', function($scope, QuizData, $routeParams, $http, $location,$modal) {
  
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
    QuizData.queryList($scope.tab, $scope.outputData).success(function(data, status, headers, config) {
        $scope.updateData(data);        
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

}])

.controller('PersonalCabinetProfileCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {

  $scope.tab = 'profile';

}]);

