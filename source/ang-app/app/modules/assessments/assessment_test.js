'use strict';

describe('yunakQuiz.assessments', function(){
    
beforeEach(module('yunakQuiz.assessments'));

	describe('QuizCtrl', function (){
	    var scope, QuizCtrl;
	    beforeEach(inject(function($controller, $rootScope) {
	        scope = $rootScope.$new();
	        QuizCtrl = $controller('QuizCtrl', {$scope:scope});
        }));
        it('scope should be set properly ', function() {
	        expect(scope.checkAnswer).toBeDefined();
	        expect(scope.checkQuiz).toBeDefined();
	        expect(scope.checkQuestion).toBeDefined();
	        expect(scope.passQuiz).toBeDefined();
        });
 
        describe('function', function(){
			var  quiz, question, answer, question2, answer2, checkQuestion;
	    	beforeEach(inject(function($controller, $rootScope) {
	        	quiz = {  
					"questions": [{
						"title": "How old are you 123?",
						"answers": [{},{},{}] },
						{
						"title": "How cold are you 456?",
						"answers": [{},{},{}] }	
						] 
					};
        	question = quiz.questions[0];
        	answer = question.answers[0];
        	question2 = quiz.questions[1];
        	answer2 = question2.answers[0];
        	}));

        	it('checkAnswer() should select answer, and call question validation function', function() {
        		spyOn(scope, "checkQuestion");
        		expect(answer.checked).toBeFalsy();
        		scope.checkAnswer(answer, question);
        		expect(answer.checked).toBeTruthy();
        		expect(scope.checkQuestion).toHaveBeenCalledWith(question);
        	});
        
	        it('checkQuestion() should validate the question, if answer is selected', function () {
			    scope.checkQuestion(question);
			    expect(question.invalid).toBeTruthy();
			    answer.checked = true;
			    scope.checkQuestion(question);
			    expect(question.invalid).toBeFalsy();
	        });

	        it('checkQuiz() should validate quiz, if all of quiz questions have selected answers', function(){
	        	spyOn(scope, 'checkQuestion').andCallFake(
	        		function (question){
						question.invalid = true;
						for(var y=0; y<question.answers.length; y++){
							if(question.answers[y].checked){
								question.invalid=false;
							} else {
								question.answers[y].checked = false;
							}
						};
					}
	        		);
	        	expect(scope.checkQuiz(quiz)).toBeFalsy();
	        	//0672256333
	        	answer.checked = true;
	        	answer2.checked = true;
	        	expect(scope.checkQuiz(quiz)).toBeTruthy();
	        });
        });
    });

    describe('QuizResultCtrl', function (){
	    var scope, QuizResultCtrl;
	    beforeEach(inject(function($controller, $rootScope) {
	        scope = $rootScope.$new();
	        QuizResultCtrl = $controller('QuizResultCtrl', {$scope:scope});
        }));
        it('scope should be set properly ', function() {
	        expect(scope.checkQuestions).toBeDefined();
	        expect(scope.checkAnswer).toBeDefined();
	        expect(scope.correctAnswerCounter).toBeDefined();
	        expect(scope.redirectToAssessment).toBeDefined();
        });
        describe('function', function(){
        	beforeEach(inject(function($controller, $rootScope) {
	        	scope.quiz = {  
					"questions": [{
						"title": "How old are you 123?",
						"answers": [{checked: true, "correct": true },{},{}] },
						{
						"title": "How cold are you 456?",
						"answers": [{},{checked: true,},{}] }
						] 
					}
				}));

        	it('checkAnswer() should check question for correct answers ', function() {
		        expect(scope.checkAnswer(scope.quiz.questions[0])).toBeTruthy();
		        expect(scope.checkAnswer(scope.quiz.questions[1])).toBeFalsy();
        	});
        	it("checkQuestions() should check all of quiz questions for correct answers", function() {
        		spyOn(scope, 'checkAnswer').andCallFake(function(question) {
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
        		});
        		scope.checkQuestions();
        		expect(scope.quiz.questions[0].nice).toBeTruthy();
        		expect(scope.quiz.questions[1].nice).toBeFalsy();
        	});
        	it("correctAnswerCounter() should count questions with right answers", function() {
        		scope.correctAnswerCounter();
        		expect(scope.correctAnswerCounter()).toEqual(0);
        		scope.quiz.questions[0].nice = true;
        		expect(scope.correctAnswerCounter()).toEqual(50);
        		scope.quiz.questions[1].nice = true;
        		expect(scope.correctAnswerCounter()).toEqual(100);
        	});
        	
        });
        
    });
    describe('QuizEditCtrl', function (){
	    var scope, QuizEditCtrl;
	    beforeEach(inject(function($controller, $rootScope) {
	        scope = $rootScope.$new();
	        QuizEditCtrl = $controller('QuizEditCtrl', {$scope:scope});
        }));
        it('scope should be set properly ', function() {
	        expect(scope.addAnswer).toBeDefined();
	        expect(scope.deleteAnswer).toBeDefined();
	        expect(scope.setCorrectAnswer).toBeDefined();
        });
        
        describe(".  .  .", function(){
        	var question, questions;
        	beforeEach(function() {
        		scope.quiz = {};
    			scope.quiz.questions = [{answers:[{correct:false},{correct:false}]}];
    			questions = scope.quiz.questions;
    			question = questions[0];	
        	});

        	it("scope.addAnswer() should add new answer", function() {
        		expect(question.answers.length).toEqual(2);
        		scope.addAnswer(question);
        		expect(question.answers.length).toEqual(3);
        	});
        	it("scope.deleteAnswer() should delete selected answer", function() {
        		expect(question.answers[0].toDelete).not.toBeDefined();
        		scope.deleteAnswer(question.answers[0]);
        		expect(question.answers[0].toDelete).toBeTruthy();
        	});
        	it("scope.setCorrectAnswer(), should mark answer as correct and validate the question", function() {
        		expect(question.answers[0].correct).toBeFalsy();
        		scope.setCorrectAnswer(question, question.answers[0]);
        		expect(question.answers[0].correct).toBeTruthy();
        		expect(question.invalid).toBeFalsy();
        	});
        	it("scope.addQuestion() should add new question with two answers", function() {
        		expect(questions.length).toEqual(1);
        		scope.addQuestion();
        		expect(scope.addQuestionDisabled).toBeTruthy;
        		expect(questions.length).toEqual(2);
        		expect(questions[1].answers.length).toEqual(2);
        	});
        	it("scope.deleteQuestion() should delete selected question" , function() {
        		expect(questions.length).toEqual(1);
        		scope.deleteQuestion(question, 0);
        		expect(questions.length).toEqual(0);
        	});
        	it("scope.deleteQuestion() should mark to delete selected question if it has id", function() {
				expect(question.toDelete).not.toBeDefined();
				question.id = "1";
				scope.deleteQuestion(question, 0);
				expect(question.toDelete).toBeTruthy();
        	});
        })	


    });
     describe('QuizCreateCtrl', function (){
	    var scope, QuizCreateCtrl;
	    beforeEach(inject(function($controller, $rootScope) {
	        scope = $rootScope.$new();
	        QuizCreateCtrl = $controller('QuizCreateCtrl', {$scope:scope});
        }));
        it('scope should be set properly ', function() {
	        expect(scope.addAnswer).toBeDefined();
	        expect(scope.deleteAnswer).toBeDefined();
	        expect(scope.setCorrectAnswer).toBeDefined();

        });

        describe("function", function() {
        	it("scope.init() should initialize empty quiz object, and call necessary functions", function() {
        		spyOn(scope, 'addQuestion');
				spyOn(scope, 'getCat');
				scope.init();
        		expect(scope.quiz).toBeDefined();
        		expect(scope.quiz.questions).toBeDefined();
        		expect(scope.getCat).toHaveBeenCalled();
        		expect(scope.addQuestion).toHaveBeenCalled();
        	});


        describe(".  .  .", function(){
        	var question, questions;
        	beforeEach(function() {
        		scope.quiz = {};
    			scope.quiz.questions = [{answers:[{correct:false},{correct:false}]}];
    			questions = scope.quiz.questions;
    			question = questions[0];
    			 
    			
        	});

        	it("scope.addAnswer() should add new answer", function() {
        		expect(question.answers.length).toEqual(2);
        		scope.addAnswer(question);
        		expect(question.answers.length).toEqual(3);
        	});
        	it("scope.deleteAnswer() should delete selected answer", function() {
        		expect(question.answers.length).toEqual(2);
        		scope.deleteAnswer(0, question);
        		expect(question.answers.length).toEqual(1);
        	});
        	it("scope.setCorrectAnswer(), should mark answer as correct and validate the question", function() {
        		expect(question.answers[0].correct).toBeFalsy();
        		scope.setCorrectAnswer(question, question.answers[0]);
        		expect(question.answers[0].correct).toBeTruthy();
        		expect(question.invalid).toBeFalsy();
        	});
        	it("scope.addQuestion() should add new question with two answers", function() {
        		expect(questions.length).toEqual(1);
        		scope.addQuestion();
        		expect(scope.addQuestionDisabled).toBeTruthy;
        		expect(questions.length).toEqual(2);
        		expect(questions[1].answers.length).toEqual(2);
        	});
        	it("scope.deleteQuestion() should delete selected question" , function() {
        		expect(questions.length).toEqual(1);
        		scope.deleteQuestion(0,1);
        		expect(questions.length).toEqual(0);
        	});
        })	
        	



        	
        });
        
    });
	
// Testing Routing 
    describe('Routing', function() {
    
		var location, route, rootScope;
		beforeEach(inject(
			function($location, $route, $rootScope) {
			location = $location;
			route = $route;
			rootScope = $rootScope;
		}));
		describe('assessment_show route', function() {
			beforeEach(inject(function($httpBackend) {
			$httpBackend.expectGET('modules/assessments/assessment_show.html').respond(200);
			}));
			it('should load the assessment_show page on successful load of...', function() {
				location.path('/assessments/:quiz_id');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizCtrl')
			});
			
		
		});
		describe('assessment_result route', function() {
			beforeEach(inject(function($httpBackend) {
			$httpBackend.expectGET('modules/assessments/assessment_result.html').respond(200);
		}));
			it('should load the assessment_result page on successful load of...', function() {
				location.path('/assessments/:quiz_id/result');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizResultCtrl')
			});
		});
		describe('assessment_create route', function() {
			beforeEach(inject(function($httpBackend) {
			$httpBackend.expectGET('modules/assessments/assessment_create.html').respond(200);
		}));
			it('should load the assessment_create page on successful load of...', function() {
				location.path('/admin/assessments/create');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizCreateCtrl')
			});
		});
		describe('assessment_result route', function() {
			beforeEach(inject(function($httpBackend) {
			$httpBackend.expectGET('modules/assessments/assessment_edit.html').respond(200);
		}));
			it('should load the assessment_edit page on successful load of...', function() {
				location.path('/admin/assessments/:quiz_id/');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizEditCtrl')
			});
		});
	});

//Testing Templating
	describe('Templating', function() {
        var $httpBackend,
        location,
		route,
		rootScope;

		beforeEach(inject(
			function($rootScope, $route, _$httpBackend_, $location){
			location = $location;
			rootScope = $rootScope;
			route = $route;
			$httpBackend = _$httpBackend_;
		}));
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			});
    	it('loads quiz pass template', function() {
			$httpBackend.expectGET('modules/assessments/assessment_show.html').respond(200);
			location.path('/assessments/:quiz_id');
			rootScope.$digest();
			$httpBackend.flush();
		});
    	it('loads quiz result template', function() {
			$httpBackend.expectGET('modules/assessments/assessment_result.html').respond(200);
			location.path('/assessments/:quiz_id/result');
			rootScope.$digest();
			$httpBackend.flush();
		});

		it('loads assessment create template', function() {
			$httpBackend.expectGET('modules/assessments/assessment_create.html').respond(200);
			location.path('/admin/assessments/create');
			rootScope.$digest(); 
			$httpBackend.flush();
		});
		it('loads assessment edit template', function() {
			$httpBackend.expectGET('modules/assessments/assessment_edit.html').respond(200);
			location.path('/admin/assessments/:quiz_id/');
			rootScope.$digest();
			$httpBackend.flush();
		});          
	});
});


