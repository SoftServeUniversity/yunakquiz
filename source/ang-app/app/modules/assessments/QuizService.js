'use strict';

yunakQuizApp.factory('QuizService', ['$http', function($http){
  var back_url = 'http://localhost:9292';
  var quiz={};

  function getQuiz(id){
    return $http.get(back_url+'/assessments/'+id )
  };

  function postResult(id, result){
      return $http.post(back_url+'/assessments/result', {quizId : id, result : result})
  };

  /** Validate if question has at least one answer picked  */
  function validateQuestion(question){
    question.invalid=true;
    angular.forEach(question.answers, function(answer){
      if(answer.checked){
        question.invalid=false;
      }
    });
  };

    /** Validate if all questions in quiz has marked answers  */
  function validateQuiz(){
    var questions = this.quiz.questions;
    var quizValid=true;
    angular.forEach(questions, function(question){
       validateQuestion(question);
       if (question.invalid) {quizValid = false;}
    });
    return quizValid;
  };

  /** Check all questions in quiz */
  function checkQuestions(questions){
    for (var i=0; i<questions.length; i++){
      questions[i].nice = checkAnswers(questions[i]);
    }
  };

  /** check question for correct answers  */
  function checkAnswers(question){
    var correct=true;
    angular.forEach(question.answers, function(value){
      if(value.correct){
        if(value.checked) {correct= true && correct;} 
        else {correct= false;}
      } 
      else if (value.checked) {correct= false;}
    });
    return correct;
  };

  /** count quiz score */
 function countCorrectAnswers(quiz){
    var questions = quiz.questions;
    var correctAnswers = 0;
    var count;
    checkQuestions(questions);
    angular.forEach(questions, function(question){
      if (question.nice) {correctAnswers++}
    });
    count = (correctAnswers / questions.length) * 100 ;
    count = count.toFixed(2);
    return +count;
  };

  function submitQuiz(){
    this.quiz.result = countCorrectAnswers(this.quiz);
    return postResult(this.quiz.id, this.quiz.result);
  };

  return {
    quiz : quiz,
    getQuiz : getQuiz,
    validateQuestion: validateQuestion,
    validateQuiz: validateQuiz,
    submitQuiz: submitQuiz
  }

}]);
