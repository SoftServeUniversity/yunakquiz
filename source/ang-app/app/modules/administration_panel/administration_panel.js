(function (){
  var  app = angular.module('yunakQuiz.administrationPanel', [
    'ngRoute',
    'yunakQuiz.aboutusTab',
    'yunakQuiz.administrationTab',
    'yunakQuiz.faqTab',
    'yunakQuiz.quizzescategoriesTab',
    'yunakQuiz.permission'
    ]);

    app.directive('adminPanel', ['getTabTemplates', '$location',
      function (getTabTemplates, $location) {
        return {
          restrict: 'E',
          templateUrl: './modules/administration_panel/administration_panel.html',
          controller: ['$scope', '$http', function ($scope, $http) {
            $scope.tabs = {};

          getTabTemplates.getTabs('admin').then(function (data) {
            $scope.tabs = data;
            if (!$scope.tabs.length) {
              $location.path( "/404" );
            }
          }, function () {
            $location.path( "/404" );
          });

          $scope.isSelected = function (url, curent) {
            if ($scope.tabs) {
              return curent ===  url;
            }
            else return false;
          };
        }]
      }
    }]);
    app.constant('Roles', {
      1: "Адміністратор",
      2: "Модератор",
      3: "Користувач",
      4: "Убер адміністратор"
    });

     app.constant('TabsOutputData', {
      '/administration-panel/administrationTab': {
        currentPage: 1,
        itemsPerPage: 10,
        searchData:'',
        status: 'enabled',
        roles: 1
      },
      '/administration-panel/moderatorsTab': {
        currentPage: 1,
        itemsPerPage: 10,
        searchData:'',
        status: 'enabled',
        roles: 2
      },
      '/administration-panel/': {
      currentPage: 1,
      itemsPerPage: 10,
      searchData:'',
      status: 'enabled',
      roles: 3
      },
      '/administration-panel/blacklistTab': {
        currentPage: 1,
        itemsPerPage: 10,
        searchData:'',
        status: 'blocked',
        roles: [1,2,3]
      }
    });

    app.factory('usersResource', ['$resource',
    function($resource) {
      return $resource('http://localhost:9292/admin/users/:id/:action', null,
        {'update': { method:'PUT' }
      }); 
    }]);

})();
