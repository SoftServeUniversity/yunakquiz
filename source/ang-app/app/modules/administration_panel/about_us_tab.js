(function () {
  var  app = angular.module('yunakQuiz.aboutusTab', ['ngRoute', 'textAngular', 'yunakQuiz.permission']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/aboutusTab', {
            templateUrl: './modules/administration_panel/about_us_tab.html',
            controller: 'aboutusTab'
          })
      }
    ]);

    app.factory("aboutUsReadUpdate", ['$http', 'CONFIG', function ($http, CONFIG) {
      return { 
        read : function() {
          return $http.get(CONFIG.BASE_URL + '/about_us')
        },
        update : function (data) {
          return $http.put(CONFIG.BASE_URL + '/about_us', data)
        }
      }
    }]);

    app.controller('aboutusTab', ['$scope', '$http', 'aboutUsReadUpdate', 'getAccess', '$location',
      function ($scope, $http, aboutUsReadUpdate, getAccess, $location) {
        $scope.url = $location.path();
        $scope.content = '';
        $scope.msg = '';
        var changes = {canceled: {msg: "Зміни відхилено", color: "#419641"},
                       errorOnLoad: {msg: "Помилка завантаження", color: 'red'},
                       saved: {msg: "Зміни збережено", color: '#419641'}
                      };

        getAccess($scope.url,'admin').then(function () {
          read();
        },function(){
          $location.path( "/404" );
        });

        function read(param) {
          aboutUsReadUpdate.read().success(function (data) {
            $scope.content = data[0].about_us;
            if (param){
              $scope.msgShow(changes.canceled);
            };
          })
          .error(function () {
            $scope.msgShow(changes.errorOnLoad);
          });
        };

        $scope.readData = function (param) {
          read(param);
        };

        $scope.updateData = function () {
          aboutUsReadUpdate.update($scope.content).success(function (data) {
            $scope.msgShow(changes.saved);
          })
          .error(function (data) {
            $scope.msgShow(changes.errorOnLoad);
          });
        };

        $scope.msgShow = function (param) {
          $scope.msg = param.msg;
          $('.about-us-msg-panel').css('color', param.color);
        };

        $scope.msgHide = function () {
          $scope.msg = '';
        };
    }]);
})();
