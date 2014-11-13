(function (){
  var  app = angular.module('yunakQuiz.administrationPanel',
    ['ngRoute','yunakQuiz.aboutusTab', 'yunakQuiz.administrationTab',
    'yunakQuiz.blacklistTab', 'yunakQuiz.faqTab', 'yunakQuiz.quizzescategoriesTab',
     'yunakQuiz.userTab']);

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

    app.controller('ModalConfirmCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {
  
    $scope.clearMsg = function(){
      if($scope.errorMsg) $scope.enteredPassword = "";
      $scope.errorMsg ="";
    };

    $scope.ok = function () {
      var password = 1911;
      if($scope.enteredPassword == password){
        $scope.clearMsg();
        $modalInstance.close();
      }
      else{$scope.errorMsg = "Невірний пароль!"}
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    }]);

    app.controller('ModalStatusCtrl', ['$scope','$modalInstance', function($scope, $modalInstance) {
  
    $scope.clearMsg = function(){
      if($scope.errorMsg) $scope.enteredPassword = "";
      $scope.errorMsg ="";
    };

    $scope.ok = function () {
      var password = 1911;
      if($scope.enteredPassword == password){
        $scope.clearMsg();
        $modalInstance.close($scope.newUserRole);
      }
      else{$scope.errorMsg = "Невірний пароль!"}
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    }]);


})();
