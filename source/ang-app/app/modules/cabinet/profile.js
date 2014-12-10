(function(){
angular.module('yunakQuiz.cabinet')
.config(["flowFactoryProvider", function(flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'http://localhost:9292/avatar',
    permanentErrors: [404, 500, 501],
    testChunks: false
  };
}])
.controller("ProfileController", ["userService", "$scope", "$timeout", "$location", "uploadFileService", "$modal", "existUser", 
  function(userService, $scope, $timeout, $location, uploadFileService, $modal, existUser){
    $scope.tab = 'profile';
    this.user = {};
    var profile = this; 
    this.previousUser = {};
    this.editable = false;
    this.uploadFile = undefined;
    this.deleteError = "";
    this.emailErr = "";
    this.birthdayErr = "";
    
    this.setUploadService = function(){
      this.uploadFile = new uploadFileService(this.$flow);
    };
    
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
      this.emailErr = ""; 
      this.birthdayErr = "";  
      angular.copy(this.previousUser, this.user);
      this.editable = false;
    };
    
    this.saveEdit = function(){
      this.emailErr = "";
      this.birthdayErr = ""; 
      if (!this.user.birthday){
        this.birthdayErr = "Введіть дату народження"; 
      }else{  
        userService.update(this.user, 
          function(data){
            profile.editable = false;   
            console.log("OK");  
          }, 
          function(response, status, headers, config){
            profile.editable = true;
            if (!!response.data.email && response.data.email.indexOf(existUser) !== -1){
              profile.emailErr = "Користувач з такою електронною адресою вже існує";
            }
          });
      }
    };
    
    this.deleteUser = function(){
      var modal = $modal.open({
        templateUrl: "modules/cabinet/profile_delete_modal.html",
        controller: 'ConfirmDeleteUserCtrl',
        size: 'sm',
        resolve: {
          user: function () {
            return this.user;
          }.bind(this)
        }
      });
      modal.result.then(function(data){
        console.log("user has been deleted"); 
        $timeout(function(){ 
          $location.path("/");
        }, 400);
        $scope.$emit("user_deleted", data);
      });
    };      

 }]);
})();
