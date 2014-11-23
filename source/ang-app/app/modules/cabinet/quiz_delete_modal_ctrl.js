
angular.module('yunakQuiz.cabinet')
.controller('ModalDeleteCtrl', ['$scope','$modalInstance','CONFIG','CabinetService', 
  function($scope, $modalInstance, CONFIG,CabinetService) {
  
  $scope.clearMsg = function(){
    if($scope.errorMsg) $scope.deleteConfirm = "";
    $scope.errorMsg ="";
  };

  $scope.ok = function () {
    CabinetService.checkPwd($scope.pwd)
    .success(function(data, status, headers, config) {
        $scope.clearMsg();
        $modalInstance.close();       
      })
      .error(function(data){
        $scope.errorMsg = "Невірний пароль!"
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);