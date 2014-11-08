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

 	app.controller('faqAdminCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('http://localhost:9292/faq').success(function(data){
      $scope.Questions = data;

      $scope.saveQuestion = function(data, id) {
      //  console.log(data);
        angular.extend(data, {id: id});
        return $http.post('http://localhost:9292/saveQuestion', data);
      };

       $scope.removeQuestion = function(index) {
        // angular.extend(data, {id: index});
        $http.delete('http://localhost:9292/deleteQuestion/' + index).success(function(data1){
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