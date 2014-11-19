(function(){
angular.module('yunakQuiz.personalCabinet')
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
    
    this.changeAvatar = function(){
      this.$flow.on('filesSubmitted', function(){
        URL.revokeObjectURL(profile.avatarFileURL);
        var flowFile = profile.$flow.files[0];
        if (!!flowFile){
          profile.avatarFileURL = URL.createObjectURL(flowFile.file);
          var canvas = $('<canvas/>').get(0);
          canvas.width = canvas.height = 200;
          var context = canvas.getContext('2d');
          var image = new Image();
          image.onload = function() {
            var cropSize = (image.width < image.height)? image.width: image.height;
            var sourceX = (image.width - cropSize) / 2;
            var sourceY = (image.height - cropSize) / 2;
            context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, 200, 200);
            var croppedURI = canvas.toDataURL('image/png');
            var croppedFile = profile.dataURItoFile(croppedURI);
            profile.$flow.files[0].file = croppedFile;
            profile.$flow.files[0].size = croppedFile.size;
            profile.$flow.files[0].name = croppedFile.name;
            profile.$flow.files[0].relativePath = croppedFile.name;
            profile.$flow.files[0].bootstrap();
            $('.thumbnail.profile-avatar').attr('src', croppedURI);
          };
          image.src = profile.avatarFileURL;
        }
        profile.$flow.off('filesSubmitted');
      });
    };
        
    this.dataURItoFile = function(dataURI) {
      var base64 = ';base64,';
      var byteString, file;
      var mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0];
      if (dataURI.indexOf(base64) == -1){
        byteString = decodeURIComponent(dataURI.split(',')[1]);
        file = new Blob([byteString], {type: mimeType});
      } else {
        byteString = window.atob(dataURI.split(base64)[1]);
        var byteArray = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
        file = new Blob([byteArray], {type: mimeType});
      }
      file.name = 'crop.png';
      file.lastModifiedDate = new Date();
      return file;
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
