'use strict';

angular.module('yunakQuiz.assessments')
  .factory('QuizPassService', ['$http','CONFIG', function($http, CONFIG){
  
  var quiz={};

  function getQuiz(id){
    return $http.get(CONFIG.BASE_URL+'/assessments/'+id )
  };

  function postResult(id, result){
      return $http.post(CONFIG.BASE_URL+'/assessments/result', {quiz_id : id, grade : result})
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
    count = count.toFixed(CONFIG.SCORE_ROUND);
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
