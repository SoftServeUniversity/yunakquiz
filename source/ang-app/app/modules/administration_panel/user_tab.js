(function (){
  var  app = angular.module('yunakQuiz.userTab' ,['ngRoute']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/', {
            templateUrl: './modules/administration_panel/user_tab.html',
            controller: 'userTab'
          }).
          when('/administration-panel/userTab', {
            redirectTo: '/administration-panel/'
          })
      }
    ]);

    app.controller('userTab', ['$scope', '$http', function ($scope, $http) {

      $scope.tab = 'userTab';

      $scope.outputData={
        currentPage: 1,
        itemsPerPage: 10,
        searchData:'',
        status: 'enabled'
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

      $scope.searchQuery();



    }]);
})();
