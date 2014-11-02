(function(){
angular.module('yunakQuiz.personalCabinet')
.config(["flowFactoryProvider", function(flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'http://localhost:9292/avatar',
    permanentErrors: [404, 500, 501],
    testChunks: false
  };
}])
.factory('userService', ['$resource',
        function($resource) {
            return $resource('/user', null,
            {
                'update': { method:'PUT' }
            }); 
    }])
.controller("ProfileController", ["userService", function(userService){
    this.user = {};
    var profile = this; 
    this.previousUser = {};
    this.editable = false;
    
    this.edit = function(){
      this.editable = true;
      angular.copy(this.user, this.previousUser);
    };
    
    this.cancelEdit = function(){
      angular.copy(this.previousUser, this.user);
      this.editable = false;
    };
    
    this.saveEdit = function(){
      userService.update(this.user, 
        function(data){
          console.log("OK");  
        }, 
        function(response, status, headers, config){
          console.log("Fail");
      });
      this.editable = false;
    };
    
    this.syncUserAvatar = function(){
      userService.update({picture: this.user.picture}, 
        function(data){
          console.log("saved picture");
        },
        function(response, status, headers, config){
          console.log("Fail");
        });      
    };
    
    this.saveAvatar = function(){
      this.$flow.on('fileSuccess', function(file, response){
        profile.$flow.off('fileSuccess');
        profile.user.picture = response;
        profile.$flow.cancel();
        profile.syncUserAvatar();
      });
      this.$flow.upload();
    };
}]);
})();
