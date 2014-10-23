'use strict';

//var mockModule = require('./mocked-backend');

describe('category page', function(){

	var category1 = [{id: 1, category_id: 0, title: "Cпорт"}];
	var category3 = [{id: 3, category_id: 0, title: "Комп'ютери"}];
	var category4 = [{id: 4, category_id: 0, title: "Туризм"}];
	
	var subcategory1 = [{id: 2, category_id: 1, title: "Футбол"}, {id: 6, category_id: 1, title: "Хокей"}, {id: 7, category_id: 1, title: "Баскетбол"}];
	var subcategory3 = [{id: 8, category_id: 3, title: "Комплектуючі"}, {id: 9, category_id: 3, title: "Програмування"}, {id: 10, category_id: 3, title: "Мережі"}];
	var subcategory4 = [{id: 5, category_id: 4, title: "Країни"}, {id: 11, category_id: 4, title: "Столиці"}, {id: 12, category_id: 4, title: "Гори"}];

	var quizzes2 = [{id: 1, category_id: 2, title: "Тест на знання правил футболу"}];
	var quizzes5 = [{id: 7, category_id: 5, title: "Тест на знання географії"}];
	var quizzes6 = [{id: 2, category_id: 6, title: "Тест на знання правил хокею"},
					{id: 8, category_id: 6, title: "Тест про проходження хокею"},
					{id: 9, category_id: 6, title: "Тест про історію хокею"},
					{id: 10, category_id: 6, title: "Тест відомих хокеїстів світу"},
					{id: 11, category_id: 6, title: "Тест про історію хокею в Україні"},
					{id: 12, category_id: 6, title: "Тест про хокеїстів України"},
					{id: 13, category_id: 6, title: "Тест на знання правил"}];
	var quizzes7 = [];
	var quizzes8 = [{id: 3, category_id: 8, title: "Тест на знання комплектуючих"}];
	var quizzes9 = [{id: 4, category_id: 9, title: "Тест на знання програмування"}];
    var quizzes10 = [{id: 5, category_id: 10, title: "Тест на знання мереж"},
		     		 {id: 6, category_id: 10, title: "Тест на знання мережевих протоколів"}];
	var quizzes11 = [];
	var quizzes12 = [];

// testing 1 category

	// beforeEach(function() {
 //    	 ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);        
	// });

	describe('first category', function(){

		browser.get('http://localhost:8000/#/');

		it('click on first category', function(){
			var firstCat = element.all(by.css('.rectangle'));
			firstCat.get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/1');
		});

	    it('should see first category title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(category1.title);
	   	});

	   	it('should see subcategories of current category', function(){
	   		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
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
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/2');
	   	});	  

	   	it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	   	it('click on first category', function(){
			var firstCat = element.all(by.css('.rectangle'));
			firstCat.get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/1');
		});

	// testing 2 subcategory in 1 category

		it('should see second subcategory title', function(){
	    	expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch(subcategory1[1].title);
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
	    	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/6');
	    });	 

	    it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	   	it('click on first category', function(){
			var firstCat = element.all(by.css('.rectangle'));
			firstCat.get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/1');
		});

	// testing 3 subcategory in 1 category

		it('should see third subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(2).getText()).toMatch(subcategory1[2].title);
	   	});

	   	it('should show all quizzes of 3 subCat', function(){
	   		var thirdSubCat = element.all(by.css('.categories-container'));
	   		var thirdSubCatQuiz = thirdSubCat.get(2).all(by.repeater('quizz in quizzes'));
	   		var thirdSubCatLength = quizzes7.length;
	   		expect(thirdSubCatQuiz.count()).toMatch(thirdSubCatLength);
	   	});

	   	it('click on third subcategory', function(){
	   		var thirdSubCat = element.all(by.css('.rectangle'));
	   		thirdSubCat.get(2).click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/7');
	   	});	  

	   	it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});
	});

// testing 2 category

	// beforeEach(function() {
 //    	 ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);        
	// });

	describe('second category', function(){

		it('click on second category', function(){
			var secondCat = element.all(by.css('.rectangle'));
			secondCat.get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/3');
		});

		it('should see second category title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(category3.title);
	   	});

	   	it('should see subcategories of current category', function(){
	   		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
	   	});

	// testing 1 subcategory in 2 category

		it('should see first subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch(subcategory3[0].title);
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
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/8');
	   	});	  

	   	it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	   	it('click on second category', function(){
			var secondCat = element.all(by.css('.rectangle'));
			secondCat.get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/3');
		});

	// testing 2 subcategory in 2 category

		it('should see second subcategory title', function(){
	    	expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch(subcategory3[1].title);
	    });

	    it('should show all quizzes of 2 subCat', function(){
	    	var secondSubCat = element.all(by.css('.categories-container'));
	    	var secondSubCatQuiz = secondSubCat.get(1).all(by.repeater('quizz in quizzes'));
	    	var secondSubCatLength = quizzes9[0].length;
	    	expect(secondSubCatQuiz.count()).toMatch(secondSubCatLength);
	    });

	    it('click on second subcategory', function(){
	    	var secondSubCat = element.all(by.css('.rectangle'));
	    	secondSubCat.get(1).click();
	    	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/9');
	    });	 

	    it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	   	it('click on second category', function(){
			var secondCat = element.all(by.css('.rectangle'));
			secondCat.get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/3');
		});

	// testing 3 subcategory in 2 category

		it('should see third subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(2).getText()).toMatch(subcategory3[2].title);
	   	});

	   	it('should show all quizzes of 3 subCat', function(){
	   		var thirdSubCat = element.all(by.css('.categories-container'));
	   		var thirdSubCatQuiz = thirdSubCat.get(2).all(by.repeater('quizz in quizzes'));
	   		var thirdSubCatLength = quizzes10.length;
	   		expect(thirdSubCatQuiz.count()).toMatch(thirdSubCatLength);
	   	});

	   	it('click on third subcategory', function(){
	   		var thirdSubCat = element.all(by.css('.rectangle'));
	   		thirdSubCat.get(2).click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/10');
	   	});	  

	   	it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});
	});

// testing 3 category

	// beforeEach(function() {
 //    	 ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);        
	// });

	describe('third category', function(){

		it('click on third category', function(){
			var thirdCat = element.all(by.css('.rectangle'));
			thirdCat.get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/4');
		});

		it('should see third category title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(category4.title);
	   	});

	   	it('should see subcategories of current category', function(){
	   		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
	   	});

	// testing 1 subcategory in 3 category

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
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/5');
	   	});	  

	   	it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	   	it('click on third category', function(){
			var thirdCat = element.all(by.css('.rectangle'));
			thirdCat.get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/4');
		});

	// testing 2 subcategory in 3 category

		it('should see second subcategory title', function(){
	    	expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch(subcategory4[1].title);
	    });

	    it('should show all quizzes of 2 subCat', function(){
	    	var secondSubCat = element.all(by.css('.categories-container'));
	    	var secondSubCatQuiz = secondSubCat.get(1).all(by.repeater('quizz in quizzes'));
	    	var secondSubCatLength = quizzes11.length;
	    	expect(secondSubCatQuiz.count()).toMatch(secondSubCatLength);
	    });

	    it('click on second subcategory', function(){
	    	var secondSubCat = element.all(by.css('.rectangle'));
	    	secondSubCat.get(1).click();
	    	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/11');
	    });	 

	    it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	   	it('click on third category', function(){
			var thirdCat = element.all(by.css('.rectangle'));
			thirdCat.get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/4');
		});

	// testing 3 subcategory in 3 category

		it('should see third subcategory title', function(){
	   		expect(element.all(by.css('.rectangle')).get(2).getText()).toMatch(subcategory4[2].title);
	   	});

	   	it('should show all quizzes of 3 subCat', function(){
	   		var thirdSubCat = element.all(by.css('.categories-container'));
	   		var thirdSubCatQuiz = thirdSubCat.get(2).all(by.repeater('quizz in quizzes'));
	   		var thirdSubCatLength = quizzes12.length;
	   		expect(thirdSubCatQuiz.count()).toMatch(thirdSubCatLength);
	   	});

	   	it('click on third subcategory', function(){
	   		var thirdSubCat = element.all(by.css('.rectangle'));
	   		thirdSubCat.get(2).click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/12');
	   	});	  

	   	it('click on home page', function(){
	   		var homePage = element(by.css('[href="#"]'));
	   		homePage.click();
	   		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	   	});

	});
});