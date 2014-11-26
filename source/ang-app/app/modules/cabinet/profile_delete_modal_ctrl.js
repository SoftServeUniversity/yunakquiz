(function(){
angular.module("yunakQuiz.cabinet")
.controller("ConfirmDeleteUserCtrl", ['$scope', '$modalInstance', 'userService', 'user',
  function($scope, $modalInstance, userService, user){
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function validateModel() {
      var model = $scope.model;
      if (!model.password || !model.enteredCaptcha) {
        $scope.deleteError = "Введіть пароль і/або капчу";
        return false;
      } else if (model.captcha != model.enteredCaptcha){
        $scope.deleteError = "Невірно введена капча";
        return false;
      }
      return true;
    }
    $scope.model = {
        captcha: getRandom(100, 999),
        enteredCaptcha: null,
        password: null
    };
    $scope.deleteError = '';
    $scope.close = function () {
        $modalInstance.dismiss();
    };
    $scope.deleteUser = function () {
      var requestParams;
      if (validateModel()) {
        requestParams = angular.extend({}, user, {
          password: $scope.model.password
        });
        userService.remove(requestParams,
        function (data) {
          $modalInstance.close(data);
        },
        function () {
          $scope.deleteError = "Невірно введений пароль";
        });
      }
    };
}]);    
    
})();
