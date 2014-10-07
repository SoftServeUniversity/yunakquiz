'use strict';

var yunakQuizApp = angular.module('yunakQuiz.assessments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/assessments/:quiz_id', {
    templateUrl: 'modules/assessments/assessment_show.html',
    controller: 'QuizCtrl',
    })

  	.when('/assessments/:quiz_id/result', {
    templateUrl: 'modules/assessments/assessment_result.html',
    controller: 'AssessmentsResultCtrl'
  })
  ;
   
}]);

yunakQuizApp.factory('QuizData', ['$http', function($http){
    return{
        get: function(id, callback){
          $http({ method: 'GET', url: 'http://localhost:9292/assessments/'+id })
          .success(function(data, status, headers, config) {
				callback(data); 
			});
        }, 
        quiz:{}
      }
    }
  ]);


yunakQuizApp.controller('QuizCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope,QuizData, $routeParams, $location) {

QuizData.get($routeParams.quiz_id, function(data){
      $scope.quiz = data; 
    });



$scope.checkAnswer = function(answer,question){
	
	answer.checked = !answer.checked;
	checkQuestion(question);
};

function checkQuiz(quiz){
	var questions = quiz.questions;
	var quizValid=true;
	for(var i =0; i < questions.length; i++){
		checkQuestion(questions[i]);
		if(questions[i].invalid){
			quizValid = false;
		};
	};
	return quizValid;
};

function checkQuestion(question){
	question.invalid=true;
	for(var y=0;y<question.answers.length;y++){
		if(question.answers[y].checked){
			question.invalid=false;}
		else {question.answers[y].checked = false}
		};
	 
};

$scope.passQuiz = function(){
	if (checkQuiz($scope.quiz)) {
		QuizData.quiz = $scope.quiz;
		$location.path($location.path()+'/result');	
	};
};


}]);

yunakQuizApp.controller('AssessmentsResultCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope, QuizData, $routeParams, $location) {

$scope.assessment = QuizData.quiz || {title:"Hello world"};


function checkQuestions (){
	for (var i=0;i<$scope.assessment.questions.length; i++){
		$scope.assessment.questions[i].nice = checkAnswer($scope.assessment.questions[i]);
	}
}

function checkAnswer (question){
	var correct=false;
	for (var i=0;i<question.answers.length; i++){
		if(question.answers[i].correct){
			if(question.answers[i].checked){
				correct= true;
			}
			else {
				correct= false;
			}
		}
		
	}
	return correct;
}


	
	$scope.correctAnswerCounter = function(){
		var questions = $scope.assessment.questions;
		var counter = 0;
		for (var i=0;i<questions.length; i++){
			if (questions[i].nice) {counter++}
		}
		var count = (counter / questions.length)*100 ;
		var count = Math.round(count);
		return count;

	}


	$scope.redirectToAssessment = function(){
		$location.path('/assessments/'+$routeParams.quiz_id);	

	
	};


	if ($scope.assessment.questions)
	{
		checkQuestions();
		$scope.counter = $scope.correctAnswerCounter();
	}	
	else 
	{
		$scope.redirectToAssessment();
	}

	
}]);

// yunakQuizApp.factory('Assessment', ['$resource',
//   function($resource){
//     return $resource('http://localhost:9292/assessments/1', {}, {
//       get: {method:'GET', isArray:true}
//     });
//   }]);
