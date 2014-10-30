(function(){
  var  app = angular.module('yunakQuiz.subcategory' ,['ngRoute']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
        when('/subcategory', {
          templateUrl: 'modules/subcategory/subcategory.html',
        })
      }
    ]);
    app.controller("subcategoryController", function($http,$scope){
    });
})();
