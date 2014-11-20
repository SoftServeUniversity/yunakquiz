(function(){
angular.module('yunakQuiz.cabinet')
.config(["flowFactoryProvider", function(flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'http://localhost:9292/avatar',
    permanentErrors: [404, 500, 501],
    testChunks: false
  };
}])
.controller("ProfileController", ["userService", "$scope", "$timeout", "$location", "uploadFileService", 
  function(userService, $scope, $timeout, $location, uploadFileService){
    $scope.tab = 'profile';
    this.user = {};
    var profile = this; 
    this.previousUser = {};
    this.editable = false;
    this.uploadFile = undefined;
    this.deleteError = "";
    
    this.setUploadService = function(){
      this.uploadFile = new uploadFileService(this.$flow);
    };
    
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
          console.log("Fail");
        });
      this.editable = false;
    };
    
    this.clearErrors = function(){
      this.deleteError = "";
      this.user.password = "";
      this.enteredCaptcha = "";
    };
    
    this.deleteUser = function(){
      if (!this.user.password || !this.enteredCaptcha) {
          this.deleteError = "Введіть пароль і/або капчу";
      } else {
        if (this.captcha != this.enteredCaptcha){
            this.deleteError = "Невірно введена капча";
        } else {
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
              profile.deleteError = "Невірно введений пароль";
            });
        }
      }
    };      
}])
.directive("deleteUserProfile", function(){
  return {
    restrict: "E",
    templateUrl: "modules/cabinet/profile_delete_modal.html"
  };
});
})();
