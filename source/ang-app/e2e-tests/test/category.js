'use strict';

describe('categoryPage', function(){

// testing 1 category

	describe('first category', function(){
		
		browser.get('http://localhost:8000/#/');

		it('click on first category', function(){
			var firstCat = element.all(by.css('.rectangle'));
			firstCat.get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/1');
		});
	        	it('should see first category title', function(){
	        		expect(element(by.css('h3')).getText()).toMatch('/Спорт/');
	        	});

	        	it('should see subcategories of current category', function(){
	        		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
	        	});

	        	// testing 1 subcategory in 1 category

	        	it('should see first subcategory title', function(){
	        		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch('Футбол');
	        	});

	        	it('click on first subcategory', function(){
	        		var firstSubCat = element.all(by.css('.rectangle'));
	        		firstSubCat.get(0).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  

	        	it('click on first category', function(){
		        	var firstCat = element.all(by.css('.rectangle'));
		        	firstCat.get(0).click();
		        	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/1');
		        });  
		
	        	it('should show all quizzes of 1 subCat', function(){
	        		var firstSubCat = element.all(by.css('.rectangle'));
	        		firstSubCat.get(0).all(by.repeater('quizz in quizzes')).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});

	         	// testing 2 subcategory in 1 category

	         	it('should see second subcategory title', function(){
	         		expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch('Хокей');
	         	});

	         	it('click on second subcategory', function(){
	        		var secondSubCat = element.all(by.css('.rectangle'));
	        		secondSubCat.get(1).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  

	        	it('click on first category', function(){
		        	var firstCat = element.all(by.css('.rectangle'));
		        	firstCat.get(0).click();
		        	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/1');
		        });  
		
	         	it('should show all quizzes of 2 subCat', function(){
	         		var secondSubCat = element.all(by.css('.rectangle'));
	         		secondSubCat.get(1).all(by.repeater('quizz in quizzes')).click();
	         		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	         	});

	        	// testing 3 subcategory in 1 category

	        	it('should see third subcategory title', function(){
	        		expect(element.all(by.css('.rectangle')).get(2).getText()).toMatch('Баскетбол');
	        	});

	        	it('click on third subcategory', function(){
	        		var thirdSubCat = element.all(by.css('.rectangle'));
	        		thirdSubCat.get(2).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  
		
	        	it('should show all quizzes of 3 subCat', function(){
	        		var thirdSubCat = element.all(by.css('.rectangle'));
	        		expect(thirdSubCat.get(2).all(by.repeater('quizz in quizzes')).count()).toMatch(0);
	        	});
	});

// testing 2 category

describe('second category', function(){
		
	//	browser.get('http://localhost:8000/#/');

		it('click on second category', function(){
			var secondCat = element.all(by.css('.rectangle'));
			secondCat.get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/3');
		});
	        	it('should see second category title', function(){
	        		expect(element(by.css('h3')).getText()).toMatch(/Комп'ютери/);
	        	});

	        	it('should see subcategories of current category', function(){
	        		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
	        	});

	        	// testing 1 subcategory in 2 category

	        	it('should see first subcategory title', function(){
	        		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch('Комплектуючі');
	        	});

	        	it('click on first subcategory', function(){
	        		var firstSubCat = element.all(by.css('.rectangle'));
	        		firstSubCat.get(0).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  

	        	it('click on second category', function(){
		        	var secondCat = element.all(by.css('.rectangle'));
		        	secondCat.get(1).click();
		        	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/3');
		        });  
		
	        	it('should show all quizzes of 1 subCat', function(){
	        		var firstSubCat = element.all(by.css('.rectangle'));
	        		firstSubCat.get(0).all(by.repeater('quizz in quizzes')).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});

	         	// testing 2 subcategory in 2 category

	         	it('should see second subcategory title', function(){
	         		expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch('Програмування');
	         	});

	         	it('click on second subcategory', function(){
	        		var secondSubCat = element.all(by.css('.rectangle'));
	        		secondSubCat.get(1).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  

	        	it('click on second category', function(){
		        	var secondCat = element.all(by.css('.rectangle'));
		        	secondCat.get(1).click();
		        	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/3');
		        });  
		
	         	it('should show all quizzes of 2 subCat', function(){
	         		var secondSubCat = element.all(by.css('.rectangle'));
	         		secondSubCat.get(1).all(by.repeater('quizz in quizzes')).click();
	         		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	         	});

	        	// testing 3 subcategory in 2 category

	        	it('should see third subcategory title', function(){
	        		expect(element.all(by.css('.rectangle')).get(2).getText()).toMatch('Мережі');
	        	});

	        	it('click on third subcategory', function(){
	        		var thirdSubCat = element.all(by.css('.rectangle'));
	        		thirdSubCat.get(2).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  
		
	        	it('should show all quizzes of 3 subCat', function(){
	        		var thirdSubCat = element.all(by.css('.rectangle'));
	        		thirdSubCat.get(2).all(by.repeater('quizz in quizzes')).click();
	         		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});
	});

// testing 3 category

describe('third category', function(){
		
	//	browser.get('http://localhost:8000/#/');

		it('click on third category', function(){
			var thirdCat = element.all(by.css('.rectangle'));
			thirdCat.get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/4');
		});
	        	it('should see third category title', function(){
	        		expect(element(by.css('h3')).getText()).toMatch(/Туризм/);
	        	});

	        	it('should see subcategories of current category', function(){
	        		expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
	        	});

	        	// testing 1 subcategory in 3 category

	        	it('should see first subcategory title', function(){
	        		expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch('Країни');
	        	});

	        	it('click on first subcategory', function(){
	        		var firstSubCat = element.all(by.css('.rectangle'));
	        		firstSubCat.get(0).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  

	        	it('click on third category', function(){
		        	var thirdCat = element.all(by.css('.rectangle'));
		        	thirdCat.get(2).click();
		        	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/4');
		        });  
		
	        	it('should show all quizzes of 1 subCat', function(){
	        		var firstSubCat = element.all(by.css('.rectangle'));
	        		firstSubCat.get(0).all(by.repeater('quizz in quizzes')).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});

	         	// testing 2 subcategory in 3 category

	         	it('should see second subcategory title', function(){
	         		expect(element.all(by.css('.rectangle')).get(1).getText()).toMatch('Столиці');
	         	});

	         	it('click on second subcategory', function(){
	        		var secondSubCat = element.all(by.css('.rectangle'));
	        		secondSubCat.get(1).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  

	        	it('click on third category', function(){
		        	var thirdCat = element.all(by.css('.rectangle'));
		        	thirdCat.get(2).click();
		        	expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/parentcat-page/4');
		        });  
		
	         	it('should show all quizzes of 2 subCat', function(){
	         		var secondSubCat = element.all(by.css('.rectangle'));
	        		expect(secondSubCat.get(1).all(by.repeater('quizz in quizzes')).count()).toMatch(0);
	         	});

	        	// testing 3 subcategory in 3 category

	        	it('should see third subcategory title', function(){
	        		expect(element.all(by.css('.rectangle')).get(2).getText()).toMatch('Гори');
	        	});

	        	it('click on third subcategory', function(){
	        		var thirdSubCat = element.all(by.css('.rectangle'));
	        		thirdSubCat.get(2).click();
	        		expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/');
	        	});	  
		
	        	it('should show all quizzes of 3 subCat', function(){
	        		var thirdSubCat = element.all(by.css('.rectangle'));
	        		expect(thirdSubCat.get(2).all(by.repeater('quizz in quizzes')).count()).toMatch(0);
	        	});
	});

});