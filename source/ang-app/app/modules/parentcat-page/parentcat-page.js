(function (){
  var  app = angular.module('yunakQuiz.parentCatPage' ,['ngRoute','yunakQuiz.categoriesContainer']);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/parentcat-page/:par_id', {
          templateUrl: './modules/parentcat-page/parentcat-page.html',
          controller: 'parentCatPage'
        })
      }
  ]);

  app.filter('charLimit', function(){
    return function(quizT){
      if(quizT.length <= 13){
        return quizT
      } else{
        return quizT.substring(0, 13) + '...'
      }
    }
  });

  app.directive('tooltip', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
          $(element).hover(function(){
              $(element).tooltip('show');
          }, function(){
              $(element).tooltip('hide');
          });
      }
    };
  });
  
  app.controller('parentCatPage', ['$scope', '$http','$routeParams','$filter', 'quizesById', 'categoriesQuery',  function ($scope, $http, $routeParams, $filter, quizesById, categoriesQuery) {
    $scope.parCategory = {};
    $scope.quizzes = {};
    $scope.subCategories = {};
    var current_id =  $routeParams.par_id;

    categoriesQuery.getCategoryById(current_id).success(function(data){
      $scope.parCategory = data;
    });
    categoriesQuery.getSubCatByParCatId(current_id).success(function(data){
      $scope.subCategories = data;
    });
    quizesById.get().success(function(data){
      $scope.quizzes = data;
    });  

    $scope.numberTest = function(subcat_id){
      var number = 0;
      var quizz = $scope.quizzes;
        for(var key in quizz){
          if(quizz[key].category_id === subcat_id) {
            number++;
          }
        };
        return number;
    };       
  }])
})();