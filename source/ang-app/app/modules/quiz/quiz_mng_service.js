'use strict';

/** Connection to back-end for quiz  */
angular.module('yunakQuiz.assessments')

.factory('QuizMngService', 
  ['$http', '$location', 'QuizResource', '$filter', 'CONFIG',
  function($http, $location, QuizResource, $filter, CONFIG){

  var quiz = {}
  
  function Question(){
    this.answers = [];
    for (var i=0; i < (CONFIG.MIN_ASWERS_QTY); i++){
      this.answers.push(new Answer());
    };
  };

  function Answer(){
    this.correct = false;
  };

  function initQuiz(){
    this.quiz = new QuizResource();
    this.quiz.questions = [];
    for (var i=0; i < (CONFIG.MIN_QUESTIONS_QTY); i++){
      this.quiz.questions.push(new Question());
    };
  };

  function filterDeleted(element) {
    return element.toDelete ? false : true
  };

  function validateQuiz(quiz){
    var invalid = false;
    var questions = $filter('filter')(quiz.questions, filterDeleted);
    angular.forEach(questions, function(question){
      validateQuestion(question);
      if(question.invalid){
          invalid = true;
      };
    });
    return invalid;
  };

  /** check question to have at least one correct answer */
  function validateQuestion (question){
    var answers = $filter('filter')(question.answers, filterDeleted);
    answers = $filter('filter')(answers, {correct: true})
    question.invalid =  answers.length ? false : true;
  };
  
  return {
    quiz : quiz,
    Question : Question,
    Answer : Answer,
    initQuiz : initQuiz,
    validateQuiz : validateQuiz 
  }

}])

