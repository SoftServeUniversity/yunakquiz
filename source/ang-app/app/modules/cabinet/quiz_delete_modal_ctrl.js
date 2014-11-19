
angular.module('yunakQuiz.cabinet')
.controller('ModalDeleteCtrl', ['$scope','$modalInstance','CONFIG', 
  function($scope, $modalInstance, CONFIG) {
  
  $scope.clearMsg = function(){
    if($scope.errorMsg) $scope.deleteConfirm = "";
    $scope.errorMsg ="";
  };

  $scope.ok = function () {
    if($scope.deleteConfirm === CONFIG.DEL_PASSWORD){
      $scope.clearMsg();
      $modalInstance.close();
    }
    else{$scope.errorMsg = "Невірний пароль!"}
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);