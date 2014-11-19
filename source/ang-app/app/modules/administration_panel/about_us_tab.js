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
        var changes = {canceled:{msg:"Зміни відхилено", color:"#419641"},
                      errorOnLoad:{msg:"Помилка завантаження", color:'red'},
                      saved: {msg:"Зміни збережено", color:'#419641'}};

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
            $scope.msgShow(changes.canceled);
          };
        })
        .error(function(data){
          $scope.msgShow(changes.errorOnLoad);
        });
        };

        $scope.updateData = function(){
          aboutUsReadUpdate.update($scope.content).success(function(data){
          $scope.msgShow(changes.saved);
        })
        .error(function(data){
          $scope.msgShow(changes.errorOnLoad);
        });
        };

        $scope.msgShow = function (param) {
          $scope.msg = param.msg;
          $('..about-us-msg-panel').css('color', param.color);
        };
        $scope.msgHide = function () {
           $scope.msg = '';
        };
    }]);
})();
