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
yunakQuizApp.controller('AssessmentsCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

$scope.assessment ={
	id: 1, 
	name: "Assessment 1",
	description: "Description for test",
	questions: [
		{title: 'Question 1',
		 description: "Description 1",
		 answers : [{title:"aaa1", checked:false}, 
		 {title:"bbb", checked:false}, 
		 {title:"ccc", checked:false}]},
		{title: 'Question 2',
		 description: "Description 2",
		 answers : [{title:"aaa2", checked:false}, 
		 {title:"bbb2", checked:false}, 
		 {title:"ccc2", checked:false}]},
		{title: 'Question 3',
		 description: "Description 3",
		 answers : [{title:"aaa3", checked:false}, 
		 {title:"bbb3", checked:false}, 
		 {title:"ccc3", checked:false}]}
	]
};

$scope.checkAnswer = function(answer,question){
	
	question.invalid=false;
	answer.checked = !answer.checked;
};

function checkquestions(){
	var questions = $scope.assessment.questions;
	var questionsCount = questions.length;
	var assessmentValid=true;
	for(var i =0; i < questionsCount; i++){
		questions[i].invalid =true;
		for(var y=0;y<questions[i].answers.length;y++){
			if(questions[i].answers[y].checked){
				questions[i].invalid=false;
			};

		};
		if(questions[i].invalid) {
			assessmentValid = false;
		}
	};
	return assessmentValid;
};

$scope.passAssessment = function(){
	if (checkquestions()) {
		$location.path($location.path()+'/result');	
	};
};


}]);

yunakQuizApp.controller('AssessmentsResultCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

	$scope.getAssessmentResult = function(){ 
	var assessmentResult = {
	id: 1, 
	name: "Assessment 1",
	description: "Description for test",
	questions: [
		{title: 'Question 1',
		 description: "Description 1",
		 answers : [{title:"aaa1", checked:true,correct:true}, {title:"bbb", checked:false,correct:false}, {title:"ccc", checked:false,correct:false}] ,
		 correct:true},
		{title: 'Question 2',
		 description: "Description 2",
		 answers : [{title:"aaa2", checked:true,correct:true}, {title:"bbb2", checked:false,correct:true}, {title:"ccc2", checked:false,correct:false}] ,
		correct:true},
		{title: 'Question 3',
		 description: "Description 3",
		 answers : [{title:"aaa3", checked:true,correct:false}, {title:"bbb3", checked:false,correct:true}, {title:"ccc3", checked:true,correct:false}], 
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


