(function (){
  var  app = angular.module('yunakQuiz.headerMenu' ,['ngRoute','yunakQuiz.permission']);

    app.directive('headerMenu', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/header-menu/header-menu.html',
      }
    });
})();