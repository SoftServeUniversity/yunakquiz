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
        },
        function(){
            app.user = {};
        });
                
      $scope.$on("user_logged_in", function(event, data){
        app.user = data;
      });
      $scope.$on("user_deleted", function(event, data){
        app.user = data;
      }); 
      this.userLoggedIn = function(){
        $scope.tabs = getTabTemplates.getTabs('menuAcces');
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