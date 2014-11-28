'use strict';

describe('subcategoryPage', function(){
	var ptor = protractor.getInstance();
	var mockModule = require('../subcatBackend.js');
	var subcatTitle = 'Пошук тестів у Історія світу';
	var quizTitle = ["Тест на знання війни в Вєтнамі", "Тест на знання першої світової війни", "Тест на знання другої світової війни", "Тест на знання історії світу", "Друга світова війна", "Тест на знання першої світових воєн", "Тест на знання світових воєн", "Тест на знання історії Європи", "Тест на знання історії Німеччини", "Тест на знання історії України в часи 2 св війни"];
	var quizDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.";
	var quizId = [11, 8, 7, 6, 3, 15, 16, 18, 19, 20];
	
	beforeEach(function() {
		browser.get('http://localhost:8000/#/subcategory/6');
		ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
	});

	

	describe('subcategoryPage view', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/subcategory/6');
			//ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
		});
		
		it('should see last quizzes of current subcategory', function(){
			expect(element.all(by.repeater('quiz in searchResults')).count()).toEqual(10);
		});

		it('should have page title "Пошук тестів у Історія світу"', function() {
			expect(element.all(by.css('.pageTitle')).getText()).toMatch(subcatTitle);
		});
	});


	describe('subcategoryQuiz view', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/subcategory/6');
			ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
		});

		var quiz = element.all(by.repeater('quiz in searchResults'));
		function testQuiz(x, quizTitle, quizDescription, quizId) {
			
			it('should see name of ' + (x+1) + ' quiz', function() {
				expect(quiz.get(x).all(by.css('.quizTitle')).getText()).toMatch(quizTitle[x]);
			});

			it('should see description of ' + (x+1) + ' quiz', function() {
				expect(quiz.get(x).all(by.css('.quizDescription')).getText()).toMatch(quizDescription[x]);
			});

			it('should see tags of ' + (x+1) + ' quiz', function() {
				expect(quiz.get(x).all(by.repeater('tag in quiz.allTags'))).toBeDefined();
			});

			
		};

		for(var x = 0; x < 10; x++) {
			testQuiz(x, quizTitle[x], quizDescription[x], quizId[x]);
		}
	});

});
