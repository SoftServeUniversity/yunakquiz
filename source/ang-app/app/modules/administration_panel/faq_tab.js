(function (){
  var  app = angular.module('yunakQuiz.faqTab' ,['ngRoute', 'xeditable', 'yunakQuiz.permission']);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/administration-panel/faqTab', {
          templateUrl: './modules/administration_panel/faq_tab.html',
          controller: 'faqTab'
        })
    }
  ]);
  
  app.run(function(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
  });

  app.factory("QuestionService", ['$http', function ($http) {
    return { 
      get : function() {
        return $http.get('http://localhost:9292/faq');
      },

      put : function(data){
        return $http.put('http://localhost:9292/saveQuestion', data);
      },

      delete : function(index){
        return $http.delete('http://localhost:9292/deleteQuestion/' + index);
      }
    }
  }]);
  
  app.controller('faqTab', [
    '$http',
    'QuestionService',
    '$scope',
    'getAccess',
    '$location',
    function ($http, QuestionService, $scope, getAccess, $location) {
      $scope.url = $location.path();
      $scope.showButton = false;

      var init = function(){
        QuestionService.get().success(function(data){
          $scope.Questions = data;
        }) 
      };

       getAccess($scope.url,'admin').then(function (acces) {
        init();
      },function () {
        $location.path( "/404" );
      });

      $scope.saveQuestion = function(data, id) {
        angular.extend(data, {id: id});
        QuestionService.put(data).success(function(){
          init();
        });   
        $scope.showButton = false;
      };

      $scope.removeQuestion = function(index) {
        QuestionService.delete(index).success(function(){
          init();
        });
      };      

      $scope.validate = function(index){        
        if (!$scope.Questions[index].faq_question.length  && !$scope.Questions[index].faq_answer.length) {
          $scope.Questions.splice(index, 1);
          return false
        }
        return true
      };

      $scope.cancelEction = function(){
        $scope.showButton = false;
      };

      $scope.addQuestion = function() {
        $scope.inserted = {
          faq_question: '',
          faq_answer: ''
        };
        $scope.Questions.push($scope.inserted);
        $scope.showButton = true;
      };

      init(); 
  }])
})();