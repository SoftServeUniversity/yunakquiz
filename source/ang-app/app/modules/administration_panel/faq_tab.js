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

  app.factory("getQuestions", ['$http', function ($http) {
    return { 
      get : function() {
        return $http.get('http://localhost:9292/faq');
      },

      post : function(data){
        return $http.post('http://localhost:9292/saveQuestion', data);
      },

      delete : function(index){
        return $http.delete('http://localhost:9292/deleteQuestion/' + index);
      }
    }
  }]);
    app.controller('faqTab', ['$http', 'getQuestions', '$scope', 'getAccess', '$location', function ($http, getQuestions, $scope, getAccess, $location) {
      $scope.url = $location.path();

      if(getAccess($scope.url,'admin')) {
        getQuestions.get().success(function(data){
          $scope.Questions = data;
        });
      } else {
        $location.path( "/404" );
      };
      
      $scope.saveQuestion = function(data, id) {
        angular.extend(data, {id: id});
        getQuestions.post(data);        
      };

      $scope.removeQuestion = function(index) {
        getQuestions.delete(index).success(function(data1){
          $scope.Questions = data1;
        });
      };      

      $scope.addQuestion = function() {
        $scope.inserted = {
          id: $scope.Questions.length+1,
          faq_question: '',
          faq_answer: ''
        };
        $scope.Questions.push($scope.inserted);
      };
   }])
})();