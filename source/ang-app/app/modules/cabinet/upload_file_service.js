(function(){
angular.module("yunakQuiz.cabinet")
.factory("uploadFileService", ["userService", function(userService){
  function UploadFile($flow){
    this.$flow = $flow;
    this.avatarFileURL = "";
    this.pictureName = "";
  }

  UploadFile.prototype.syncUserAvatar = function() {
    userService.update({picture: this.pictureName},
      function(data){
        console.log("saved picture");
      },
      function(response, status, headers, config){
        console.log("BAD");
      });
  };
    
  UploadFile.prototype.saveAvatar = function(){
    var service = this;
    this.$flow.on('fileSuccess', function(file, response){
      service.$flow.off('fileSuccess');
      service.pictureName = response;
      service.$flow.cancel();
      service.syncUserAvatar();
    });
    this.$flow.upload();
};
     
  UploadFile.prototype.changeAvatar = function(){
    var service = this;
    this.$flow.on('filesSubmitted', function(){
      URL.revokeObjectURL(service.avatarFileURL);
      var flowFile = service.$flow.files[0];
      if (!!flowFile){
        service.avatarFileURL = URL.createObjectURL(flowFile.file);
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
          var croppedFile = service.dataURItoFile(croppedURI);
          service.$flow.files[0].file = croppedFile;
          service.$flow.files[0].size = croppedFile.size;
          service.$flow.files[0].name = croppedFile.name;
          service.$flow.files[0].relativePath = croppedFile.name;
          service.$flow.files[0].bootstrap();
          $('.thumbnail.profile-avatar').attr('src', croppedURI);
        };
        image.src = service.avatarFileURL;
      }
      service.$flow.off('filesSubmitted');
    });
  };

  UploadFile.prototype.dataURItoFile = function(dataURI) {
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
            
  return UploadFile;
            
}]);
})();
