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
    question.invalid = !question.answers.some(function(answer){ return answer.checked })
    return question.invalid
  };

    /** Validate if all questions in quiz has marked answers  */
  function validateQuiz(){
    var questions = this.quiz.questions;
    var quizValid = true;
    angular.forEach(questions, function(question){
      if (validateQuestion(question)) {quizValid = false;}
    });
    return quizValid;
  };

  /** Check all questions in quiz */
  function checkQuestions(questions){
    angular.forEach(questions, function(question){
      question.nice = checkAnswers(question)
    });
  };

  /** check question for correct answers  */
  function checkAnswers(question){
    var nice = question.answers.every(function(answer){
      return  answer.correct == !!answer.checked
    })
    return nice;
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
