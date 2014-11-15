(function (){
  var  app = angular.module('yunakQuiz.aboutusTab' ,['ngRoute', 'textAngular', 'yunakQuiz.permission']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/aboutusTab', {
            templateUrl: './modules/administration_panel/about_us_tab.html',
            controller: 'aboutusTab'
          })
      }
    ]);

    app.factory("aboutUsReadUpdate", ['$http', function ($http) {
      return { 
        read : function() {
          return $http.get('http://localhost:9292/about_us')
        },
        update : function(data) {
          return $http.put('http://localhost:9292/about_us', data)
        }
      }
    }]);

    app.controller('aboutusTab', ['$scope', '$http', 'aboutUsReadUpdate', '$timeout', 'getAccess', '$location',
      function ($scope, $http, aboutUsReadUpdate, $timeout, getAccess, $location) {
        $scope.tab = 'Про нас';
        $scope.content = '';
        $scope.msg = '';

        getAccess($scope.tab).then(function(data){
          if(data) {
            $scope.readData();
          } else {
            $location.path( "/404" );
          }
        },function(){
          $location.path( "/404" ); 
          }
        );

        $scope.readData = function(param){

        aboutUsReadUpdate.read().success(function(data){
          $scope.content = data[0].about_us;
          if(param){
            actionMsg('#419641',"Зміни відхилено");
          };
        })
        .error(function(data){
          actionMsg('red',"Помилка завантаження");
        });
        };

        
        $scope.updateData = function(){
          aboutUsReadUpdate.update($scope.content).success(function(data){
          actionMsg('#419641',"Зміни збережено");
        })
        .error(function(data){
          actionMsg('red',"Помилка завантаження");
        });
        };

        function actionMsg(color, msg) {
          $scope.msg = '';
  
          var msgShow = function() {
            $scope.msg = msg;
          };
          var msgClear = function() {
            $scope.msg = "";
          };
         $timeout(msgShow, 100);
         $('.aboutUsMsg').css('color', color);
         $timeout(msgClear, 3000);
        }
    }]);
})();
