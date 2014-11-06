(function(){
  angular.module('yunakQuiz')
  .controller("ApplicationController", ["$scope", "accessService", 
    function($scope, accessService){
      var app = this;
      this.user = {};
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
      
      this.userLoggedIn = function(){
        return !!this.user.username;
      };
      this.logout = function(){
        accessService.remove(null,
          function(data){
            app.user = {};
          });
      };
  }]);
  
})();