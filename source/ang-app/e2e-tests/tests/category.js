'use strict';


describe('category page', function(){

	var ptor =  protractor.getInstance();
 	var mockModule = require('../categoryBackend.js');

 	var category1 = [{"id": 1, "category_id": 0, "title": "Cпорт"}];
	var category4 = [{"id": 4, "category_id": 0, "title": "Історія"}];
	var category7 = [{"id": 7, "category_id": 0, "title": "Програмування"}];

	var subcategory1 = [{"id": 2, "category_id": 1, "title": "Футбол"}, {"id": 3, "category_id": 1, "title": "Хокей"}];
	var subcategory4 = [{"id": 5, "category_id": 4, "title": "Історія України"}, {"id": 6, "category_id": 4, "title": "Історія світу"}];
	var subcategory7 = [{"id": 8, "category_id": 7, "title": "Основи ООП"}, {"id": 9, "category_id": 7, "title": "Основи Java"}];

	var quizzes = [
		{"id": 1, "category_id": 5, "title": "Тест на знання правил футболу"},
		{"id": 2, "category_id": 5, "title": "Тест на знання історії України"},
		{"id": 3, "category_id": 6, "title": "Друга світова війна"},
		{"id": 4, "category_id": 9, "title": "Історія Java"},
		{"id": 5, "category_id": 9, "title": "Базові знання Java"},
		{"id": 6, "category_id": 6, "title": "Тест на знання історії світу"},
		{"id": 7, "category_id": 6, "title": "Тест на знання другої світової війни"},
		{"id": 8, "category_id": 6, "title": "Тест на знання першої світової війни"},
		{"id": 9, "category_id": 3, "title": "Тест на знання правил хокею"},
		{"id": 10, "category_id": 2, "title": "Тест на знання видатних футболістів"},
		{"id": 11, "category_id": 6, "title": "Тест на знання війни в Вєтнамі"},
		{"id": 12, "category_id": 5, "title": "Тест на знання революції гідності 2014 року"},
		{"id": 13, "category_id": 5, "title": "Тест на знання Украйни в часи незалежності"},
		{"id": 14, "category_id": 8, "title": "Тест на знання Поліморфізму"}];

	var quizzes2 = [{"id": 10, "category_id": 2, "title": "Тест на знання видатних футболістів"}];
	var quizzes3 = [{"id": 9, "category_id": 3, "title": "Тест на знання правил хокею"}];
	var quizzes5 = [{"id": 1, "category_id": 5, "title": "Тест на знання правил футболу"},
					{"id": 2, "category_id": 5, "title": "Тест на знання історії України"},
					{"id": 12, "category_id": 5, "title": "Тест на знання революції гідності 2014 року"},
					{"id": 13, "category_id": 5, "title": "Тест на знання Украйни в часи незалежності"}];
	var quizzes6 = [{"id": 3, "category_id": 6, "title": "Друга світова війна"},
					{"id": 6, "category_id": 6, "title": "Тест на знання історії світу"},
					{"id": 7, "category_id": 6, "title": "Тест на знання другої світової війни"},
					{"id": 8, "category_id": 6, "title": "Тест на знання першої світової війни"},
					{"id": 11, "category_id": 6, "title": "Тест на знання війни в Вєтнамі"}];
	var quizzes8 = [{"id": 14, "category_id": 8, "title": "Тест на знання Поліморфізму"}];
    var quizzes9 = [{"id": 4, "category_id": 9, "title": "Історія Java"},
					{"id": 5, "category_id": 9, "title": "Базові знання Java"}];

	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  
 	});

// testing 1 category

	describe('first category', function(){

		beforeEach(function(){
			browser.get('http://localhost:8000/#/parentcat-page/1');
		});

	    it('should see first category title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(category1[0].title);
	   	});

	   	it('should see subcategories of current category', function(){
	   		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(2);
	   	});

	   	// testing 1 subcategory in 1 category

	   	it('should see first subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch(subcategory1[0].title);
	   	});

	   	it('should show all quizzes of 1 subCat', function(){
	   		var firstSubCat = element.all(by.css('.categories-container'));
	   		var firstSubCatQuiz = firstSubCat.get(0).all(by.repeater('quizz in quizzes'));
	   		var firstSubCatLength = quizzes2.length;
	   		expect(firstSubCatQuiz.count()).toEqual(firstSubCatLength);
	   	});

	   	it('click on first subcategory', function(){
	   		var firstSubCat = element.all(by.css('.rectangle'));
	   		firstSubCat.get(0).click();
	   	//	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/2');
	   	});

	   	// testing 2 subcategory in 1 category

		it('should see second subcategory title', function(){
	    	expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch(subcategory1[1].title);
	    });

	    it('should show all quizzes of 2 subCat', function(){
	    	var secondSubCat = element.all(by.css('.categories-container'));
	    	var secondSubCatQuiz = secondSubCat.get(1).all(by.repeater('quizz in quizzes'));
	    	var secondSubCatLength = quizzes3[0].length;
	    	expect(secondSubCatQuiz.count()).toMatch(secondSubCatLength);
	    });

	    it('click on second subcategory', function(){
	    	var secondSubCat = element.all(by.css('.rectangle'));
	    	secondSubCat.get(1).click();
	    //	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/6');
	    });	 
	});

// testing 2 category

	describe('second category', function(){

		beforeEach(function(){
			browser.get('http://localhost:8000/#/parentcat-page/4');
		});

	    it('should see second category title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(category4[0].title);
	   	});

	   	it('should see subcategories of current category', function(){
	   		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(2);
	   	});

	// testing 1 subcategory in 2 category

		it('should see first subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch(subcategory4[0].title);
	   	});

	   	it('should show all quizzes of 1 subCat', function(){
	   		var firstSubCat = element.all(by.css('.categories-container'));
	   		var firstSubCatQuiz = firstSubCat.get(0).all(by.repeater('quizz in quizzes'));
	   		var firstSubCatLength = quizzes5.length;
	   		expect(firstSubCatQuiz.count()).toEqual(firstSubCatLength);
	   	});

	   	it('click on first subcategory', function(){
	   		var firstSubCat = element.all(by.css('.rectangle'));
	   		firstSubCat.get(0).click();
	   	//	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/8');
	   	});	 

	// testing 2 subcategory in 2 category

		it('should see second subcategory title', function(){
	    	expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch(subcategory4[1].title);
	    });

	    it('should show all quizzes of 2 subCat', function(){
	    	var secondSubCat = element.all(by.css('.categories-container'));
	    	var secondSubCatQuiz = secondSubCat.get(1).all(by.repeater('quizz in quizzes'));
	    	var secondSubCatLength = quizzes6[0].length;
	    	expect(secondSubCatQuiz.count()).toMatch(secondSubCatLength);
	    });

	    it('click on second subcategory', function(){
	    	var secondSubCat = element.all(by.css('.rectangle'));
	    	secondSubCat.get(1).click();
	    //	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/9');
	    });	   
	});

// testing 3 category

	describe('third category', function(){

		beforeEach(function(){
			browser.get('http://localhost:8000/#/parentcat-page/7');
		});

	    it('should see third category title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(category7[0].title);
	   	});

	   	it('should see subcategories of current category', function(){
	   		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(2);
	   	});

	// testing 1 subcategory in 3 category

		it('should see first subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch(subcategory7[0].title);
	   	});

	   	it('should show all quizzes of 1 subCat', function(){
	   		var firstSubCat = element.all(by.css('.categories-container'));
	   		var firstSubCatQuiz = firstSubCat.get(0).all(by.repeater('quizz in quizzes'));
	   		var firstSubCatLength = quizzes8.length;
	   		expect(firstSubCatQuiz.count()).toEqual(firstSubCatLength);
	   	});

	   	it('click on first subcategory', function(){
	   		var firstSubCat = element.all(by.css('.rectangle'));
	   		firstSubCat.get(0).click();
	   	//	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/5');
	   	});

	// testing 2 subcategory in 3 category

		it('should see second subcategory title', function(){
	    	expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch(subcategory7[1].title);
	    });

	    it('should show all quizzes of 2 subCat', function(){
	    	var secondSubCat = element.all(by.css('.categories-container'));
	    	var secondSubCatQuiz = secondSubCat.get(1).all(by.repeater('quizz in quizzes'));
	    	var secondSubCatLength = quizzes9.length;
	    	expect(secondSubCatQuiz.count()).toMatch(secondSubCatLength);
	    });

	    it('click on second subcategory', function(){
	    	var secondSubCat = element.all(by.css('.rectangle'));
	    	secondSubCat.get(1).click();
	    //	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/11');
	    });	
	});
});
