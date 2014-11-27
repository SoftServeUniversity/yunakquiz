(function(){
  angular.module('yunakQuiz')
  .controller("ApplicationController", ["$scope", "accessService", 'getTabTemplates',
    function($scope, accessService, getTabTemplates){
      var app = this;
      this.user = {};
      $scope.tabs = {};
      accessService.get(
        function(data){
            app.user = data;
            $scope.$broadcast("user_updated", data);
            getTabTemplates.getTabs('menuAcces').then(function (data) {
              $scope.tabs = data;
            });
        },
        function(){
            app.user = {};
        });
                
      $scope.$on("user_logged_in", function(event, data){
        app.user = data;
        getTabTemplates.getTabs('menuAcces').then(function (data) {
          $scope.tabs = data;
        });
      });
      $scope.$on("user_deleted", function(event, data){
        app.user = data;
      }); 
      this.userLoggedIn = function(){
        return !!this.user.username;
      };
      this.logout = function(){
        accessService.remove(null,
          function(data){
            app.user = {};
            getTabTemplates.getResponse();
          });
      };
  }]);
})();