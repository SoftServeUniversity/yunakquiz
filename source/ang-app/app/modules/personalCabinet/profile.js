(function(){
angular.module('yunakQuiz.personalCabinet')
.config(["flowFactoryProvider", function(flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'http://localhost:9292/avatar',
    permanentErrors: [404, 500, 501],
    testChunks: false
  };
}])

.controller("ProfileController", ["userService", "$scope", "$timeout", "$location", 
  function(userService, $scope, $timeout, $location){
    var profile = this;
    this.user = {};
    var profile = this; 
    this.previousUser = {};
    this.editable = false;
    
    this.getRandom = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.captcha = this.getRandom(100, 999);
    
     $scope.$on("user_updated", function(event, data){
        profile.user = data;
     });
     
     this.copyAppUser = function(user){
        angular.copy(user, this.user);
        this.user.birthday = new Date(this.user.birthday);
     };
     
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
            console.log("BAD");
    });
      this.editable = false;
    };
    
    this.syncUserAvatar = function(){
      userService.update({picture: this.user.picture, id: this.user.id}, 
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
    
    this.deleteUser = function(){
      if ((this.captcha == this.enteredCaptcha) && (this.captcha != "") && (this.user.password != "")){
        userService.remove(this.user, 
          function(data){
            console.log("user has been deleted"); 
              $("#deleteProfile").modal("hide");
                $timeout(function(){ 
                  $location.path("/");
                }, 400);
                $scope.$emit("user_deleted", data);
          }, 
          function(response, status, headers, config){
            console.log("mistake");
          });
      };
    };
     
}])

.directive("deleteUserProfile", function(){
  return {
    restrict: "E",
    templateUrl: "modules/personalCabinet/deleteProfileModal.html"
  };
});

})();
