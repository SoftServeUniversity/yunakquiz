
angular.module('yunakQuiz.cabinet')
.controller('ModalDeleteCtrl', ['$scope','$modalInstance','CONFIG','CabinetService', 
  function($scope, $modalInstance, CONFIG,CabinetService) {
  
  /** Clear error msg and password input */
  $scope.clearMsg = function(){
    if($scope.errorMsg) { $scope.pwd.password = ""; }
    $scope.errorMsg ="";
  };

  /** Check password and close modal window */
  $scope.ok = function () {
    CabinetService.checkPwd($scope.pwd)
    .success(function(data, status, headers, config) {
        $scope.clearMsg();
        $modalInstance.close();       
      })
      .error(function(msg){
        $scope.errorMsg = msg;
    });
  };

  /** Cancel and close modal window */
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);