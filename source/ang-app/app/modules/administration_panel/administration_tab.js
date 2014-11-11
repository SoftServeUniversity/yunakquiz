(function (){
  var  app = angular.module('yunakQuiz.administrationTab' ,['ngRoute']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/administrationTab', {
            templateUrl: './modules/administration_panel/administration_tab.html',
            controller: 'administrationTab'
          })
      }
    ]);

    app.controller('administrationTab', ['$scope','$http','$location','$modal', function ($scope, $http, $location, $modal) {
      $scope.tab = 'administrationTab';

      $scope.outputData={
        currentPage: 1,
        itemsPerPage: 10,
        searchData:'',
        status: 'enabled',
        roles: [1,3,4]
      };

      $scope.searchQuery = function(){
        $scope.outputData.currentPage = 1;
        $scope.queryList();
      };

      $scope.queryList = function() {
        $http.post('http://localhost:9292/admin/users', $scope.outputData).success(function(data, status, headers, config) {
            $scope.updateData(data);        
        });
      };

      $scope.updateData = function(data){
        $scope.users = data.users;
        $scope.totalItems = data.totalItems;
      };

      $scope.deleteUser = function(userId){
        var modalDelete = $modal.open({
          templateUrl: 'modules/administration_panel/modalDeleteUser.html',
          controller: 'ModalDeleteCtrl',
          size: 'sm'
        });
        modalDelete.result.then(function () {
          $http.delete('http://localhost:9292/admin/users'+userId).success(function(data) {
            $scope.searchQuery();
          });
        });
              };

      $scope.searchQuery();

    }]);

})();
