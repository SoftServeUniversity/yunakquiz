'use strict';

var yunakQuizApp = angular.module('yunakQuiz.assessments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/assessments/:assessment_id', {
    templateUrl: 'modules/assessments/assessment_show.html',
    controller: 'AssessmentsCtrl',
    })

  	.when('/assessments/:assessment_id/result', {
    templateUrl: 'modules/assessments/assessment_result.html',
    controller: 'AssessmentsResultCtrl'
  })
  ;
   
}]);
yunakQuizApp.controller('AssessmentsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

$scope.assessment ={};

 $http({ method: 'GET', url: 'http://localhost:9292/assessments/'+$routeParams.assessment_id }).success(function(data, status, headers, config) {
				$scope.assessment = data; 
			});


$scope.checkAnswer = function(answer,question){
	
	
	answer.checked = !answer.checked;
	checkQuestion(question);
};

function checkAssessment(assessment){
	var questions = assessment.questions;
	var assessmentValid=true;
	for(var i =0; i < questions.length; i++){
		checkQuestion(questions[i]);
		if(questions[i].invalid){
			assessmentValid = false;
		};
	};
	return assessmentValid;
};

function checkQuestion(question){
	question.invalid=true;
	for(var y=0;y<question.answers.length;y++){
		if(question.answers[y].checked){
			question.invalid=false;
			break;
		};
	}; 
};

$scope.passAssessment = function(){
	if (checkAssessment($scope.assessment)) {
		$location.path($location.path()+'/result');	
	};
};


}]);

yunakQuizApp.controller('AssessmentsResultCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

	$scope.getAssessmentResult = function(){ 
	var assessmentResult = {

	id: 1, 
	name: "Правила футболу",
	description: "Тест на знання правил футболу",
	questions: [
		{title: 'Скільки гравців має бути у футбольній команді?',
		 description: "В футбольній команді 11 гравців не враховуючи запасних",
		 answers : [{title:"11", checked:true,correct:true},
		  {title:"12", checked:false,correct:false}, 
		  {title:"5", checked:false,correct:false}] ,
		 correct:true},
		{title: 'Скільки триває один тайм?',
		 description: "Один тамй триває 45 хвилин + додатковий час призначений арбітром",
		 answers : [{title:"20 хвилин", checked:false,correct:false}, 
		 {title:"45 хвилин", checked:true,correct:true}, 
		 {title:"До останього гравця", checked:false,correct:false}] ,
		correct:true},
		{title: 'Що вібдувається коли гравець торкнеться м"яча рукою?',
		 description: "Буде зафіксовано порушення правил і призначать штрафний удар, якщо цей гравець не голкіпер-)",
		 answers : [{title:"Буде зафіксовано порушення правил", checked:true,correct:true}, 
		 {title:"Призначиться штрафний удар", checked:false,correct:true},
		 {title:"Датуть пиріжок", checked:true,correct:false}, 
		 {title:"Дадуть в голову", checked:false,correct:false}], 
		correct:false}
		]
	};
	return assessmentResult;
	};
	
	$scope.correctAnswerCounter = function(){
		var questions = $scope.assessmentResult.questions
		var questionsLength = $scope.assessmentResult.questions.length;	
		var counter = 0;
		for (var i=0;i<questionsLength; i++){
			if (questions[i].correct) {counter++}
		}
		var count = (counter / questionsLength)*100 ;
		var count = Math.round(count);
		return count;

	}

	$scope.assessmentResult = $scope.getAssessmentResult();
	$scope.redirectToAssessment = function(){
		$location.path('/assessments/'+$routeParams.assessment_id);	

	
	};

	$scope.counter = $scope.correctAnswerCounter();
}]);

// yunakQuizApp.factory('Assessment', ['$resource',
//   function($resource){
//     return $resource('http://localhost:9292/assessments/1', {}, {
//       get: {method:'GET', isArray:true}
//     });
//   }]);
