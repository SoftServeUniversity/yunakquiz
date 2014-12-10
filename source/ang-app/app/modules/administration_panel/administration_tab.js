(function () {
  var  app = angular.module('yunakQuiz.administrationTab' ,['ngRoute','yunakQuiz.permission']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/administrationTab', {
            templateUrl: './modules/administration_panel/administration_tab.html',
            controller: 'administrationTab'
          }).
           when('/administration-panel/', {
            templateUrl: './modules/administration_panel/user_tab.html',
            controller: 'administrationTab'
          }).
          when('/administration-panel/userTab', {
            redirectTo: '/administration-panel/'
          }).
          when('/administration-panel/blacklistTab', {
            templateUrl: './modules/administration_panel/black_list_tab.html',
            controller: 'administrationTab' 
          }).
          when('/administration-panel/moderatorsTab', {
            templateUrl: './modules/administration_panel/moderators_tab.html',
            controller: 'administrationTab'
          })
      }
    ]);

    app.controller('administrationTab', ['$scope', 'getAccess','$http', '$location', '$modal', 'Roles', 'usersResource','TabsOutputData', 'pwdCheck',
      function ($scope, getAccess, $http, $location, $modal, Roles, usersResource, TabsOutputData, pwdCheck) {

      $scope.roles = Roles;
      $scope.url = $location.path();
      $scope.tabsabsOutputData = TabsOutputData;
      $scope.outputData = $scope.tabsabsOutputData[$scope.url];

      $scope.searchQuery = function(){
        $scope.outputData.currentPage = 1;
        $scope.queryList();
      };

      $scope.queryList = function() {
        usersResource.save($scope.outputData,
          function(data){
            $scope.updateData(data);    
          }, 
          function(response){
           console.log("Users not found");
          } 
      )};

      $scope.updateData = function(data){
        $scope.users = data.users;
        $scope.totalItems = data.totalItems;
      };


      $scope.deleteUser = function(userId){
        var modalDelete = $modal.open({
          templateUrl: 'modules/administration_panel/modalDeleteUser.html',
          controller: 'ModalConfirmCtrl',
          size: 'sm'
        });
        modalDelete.result.then(function () {

          usersResource.delete({id: userId},
          function(data){
            $scope.searchQuery();   
          }, 
          function(response){
           console.log("User not found");
          });
        });
      };

      $scope.blockUser = function(userId){
        var modalBlock = $modal.open({
          templateUrl: 'modules/administration_panel/modalBlockUser.html',
          controller: 'ModalConfirmCtrl',
          size: 'sm'
        });
        modalBlock.result.then(function () {
          usersResource.update({id: userId, action: 'status'},{status: "blocked"},
            function(data){
              $scope.searchQuery();   
            }, 
            function(response){
             console.log("User not found");
            });
        });
      };

      $scope.unblockUser = function(userId){
        var modalBlock = $modal.open({
          templateUrl: 'modules/administration_panel/modalBlockUser.html',
          controller: 'ModalConfirmCtrl',
          size: 'sm'
        });
        modalBlock.result.then(function () {
          usersResource.update({id: userId, action: 'status'},{status: "enabled"},
            function(data){
              $scope.searchQuery();   
            }, 
            function(response){
             console.log("User not found");
            });
        });
      };

      $scope.changeStatusUser = function(userId, userRole){
        var modalStatus = $modal.open({
          templateUrl: 'modules/administration_panel/modalStatusUser.html',
          controller: 'ModalStatusCtrl',
          size: 'sm', 
          resolve: {
            userRole: function () {
              return userRole;
            }
          }
        });
        modalStatus.result.then(function (newUserRole) {
          $scope.newUserRole = {
            role: newUserRole
          };
          usersResource.update({id: userId, action: 'role'}, $scope.newUserRole,
            function(data){
              $scope.searchQuery();   
            }, 
            function(response){
             console.log("User not found");
            });
        });
      };

      if (getAccess($scope.url,'admin')) {
        $scope.searchQuery();
      } else {
        $location.path( "/404" );
      };

    }]);

    app.controller('ModalConfirmCtrl', ['$scope','$modalInstance', 'pwdCheck', function($scope, $modalInstance, pwdCheck) {

    $scope.clearMsg = function(){
      if($scope.errorMsg) $scope.enteredPassword = "";
      $scope.errorMsg ="";
    };

    $scope.ok = function () {

      pwdCheck($scope.enteredPassword).success(function (data) {
          $scope.clearMsg();
          $modalInstance.close();
        }).error(function (data) {
          $scope.errorMsg = "Невірний пароль!";
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    }]);

    app.controller('ModalStatusCtrl', ['$scope','$modalInstance', 'Roles', 'userRole', 'pwdCheck', function($scope, $modalInstance, Roles, userRole, pwdCheck) {
    $scope.roles = Roles;
    $scope.userRole = userRole;

    $scope.clearMsg = function(){
      if($scope.errorMsg) $scope.enteredPassword = "";
      $scope.errorMsg ="";
    };

    $scope.ok = function () {

        pwdCheck($scope.enteredPassword).success(function (data) {
              $scope.clearMsg();
              $modalInstance.close($scope.newUserRole);
            }).error(function (data) {
                $scope.errorMsg = "Невірний пароль!";
            });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    }]);

})();

