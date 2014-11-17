'use strict';

yunakQuizApp.factory('QuizService', ['$http', function($http){
  var back_url = 'http://localhost:9292';
  var quiz={};

  function get(id){
    return $http.get(back_url+'/assessments/'+id )
  };

  function postResult(id, result){
      return $http.post(back_url+'/assessments/result', {quizId : id, result : result})
  };

  /** Validate if question has at least one answer picked  */
  function validateQuestion(question){
    question.invalid=true;
    for(var y=0; y<question.answers.length; y++){
      if(question.answers[y].checked){
        question.invalid=false;
      }
      else {
        question.answers[y].checked = false
      }
    };
  };

    /** Validate if all questions in quiz has marked answers  */
  function validateQuiz(){
    var questions = this.quiz.questions;
    var quizValid=true;
    for(var i =0; i < questions.length; i++){
      validateQuestion(questions[i]);
      if(questions[i].invalid){
        quizValid = false;
      };
    };
    return quizValid;
  };



  /** Check all questions in quiz */
  function checkQuestions(questions){
    for (var i=0; i<questions.length; i++){
      questions[i].nice = checkAnswer(questions[i]);
    }
  };

  /** check question for correct answers  */
  function checkAnswer(question){
    var correct=true;
    for (var i=0;i<question.answers.length; i++){
      if(question.answers[i].correct){
        if(question.answers[i].checked){
          correct= true && correct;
        } 
        else {correct= false;}
      } 
      else if(question.answers[i].checked){correct= false;}
    }
    return correct;
  };


  /** count quiz score */
 function countCorrectAnswers(quiz){
    var questions = quiz.questions;
    var correctAnswers = 0;
    checkQuestions(questions)
    for (var i=0;i<questions.length; i++){
      if (questions[i].nice) {correctAnswers++}
    }
    var count = (correctAnswers / questions.length) * 100 ;
    count = count.toFixed(2);
    return +count;

  };

  function submitQuiz(){
    this.quiz.result = countCorrectAnswers(this.quiz);
    return postResult(this.quiz.id, this.quiz.result);

    
  };

  return {
    quiz : quiz,
    getQuiz : get,
    validateQuestion: validateQuestion,
    validateQuiz: validateQuiz,
    submitQuiz: submitQuiz
  }


}]);
