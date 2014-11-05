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

  // app.run(function(editableOptions) {
  //   editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  // });

 	app.controller('faqAdminCtrl', ['$scope', '$http', function ($scope, $http) {

     $http.get('http://localhost:9292/faq').success(function(data){
       $scope.Questions = data;

      for (var i = $scope.Questions.length - 1; i >= 0; i--) {
        $scope.Questions[i].visible = false;
      };
     });

    $scope.showAnswer = function(index){
      $scope.Questions[index].visible = !$scope.Questions[index].visible;
    };
          
   }])

})();