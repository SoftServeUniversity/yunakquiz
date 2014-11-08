(function(){ 
	var  app = angular.module('yunakQuiz.faqAdmin' ,['ngRoute', 'xeditable']);

	app.config(['$routeProvider',
  	function($routeProvider) {
   		$routeProvider.
       	when('/faq_admin', {
       		templateUrl: './modules/faq_admin/faq_admin.html',
       		controller: 'faqAdminCtrl'
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

 	app.controller('faqAdminCtrl', ['$scope', '$http', 'getQuestions', function ($scope, $http, getQuestions) {

    getQuestions.get().success(function(data){
      $scope.Questions = data;

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

    });

   }])
})();