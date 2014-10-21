'use strict';

describe('category page', function(){

//	var browz = browser.get('http://localhost:8000/#/');
//	var catbrowz = 'http://localhost:8000/#/parentcat-page/1';
//	var subcatbrowz = 'http://localhost:8000/#/subcategory/1';
//	var location = browser.getLocationAbsUrl();
//  var category = element.all(by.css('.rectangle'));
//  var subcategory = element.all(by.repeater('subCat in subCategories'));
//  var quizz = element.all(by.repeater('quizz in quizzes'));
//  var catitle = element(by.css('h3'));

	describe('categories on home page', function(){		
		browser.get('http://localhost:8000/#/');
		it('should show three categories',function(){
			expect(element.all(by.css('.rectangle')).count()).toBe(3);
		});
		

	//	it('click on category', function(){
	//	    category.get(0).click();
	//	    expect(location).toMatch(catbrowz);
	//    });

	//	category.count().toBe(0);
	//	expect(console.log("There is no categories in DB"));
		
	});

	describe('category page', function(){
		browser.get('http://localhost:8000/#/parentcat-page/1');

	/*	it('should see category title', function(){
	        expect(element(by.css('h3')).getText()).toMatch();
	   	}); */
	    it('category title presence', function(){
	    	var title = element(by.css('.pageTitle'));
	    	expect(title.isPresent()).toBe(true);
	    });

	    it('should show three subcategories',function(){
			expect(element.all(by.repeater('subCat in subCategories')).count()).toEqual(3);
		});

		it('subcat title presence', function(){
			expect(element(by.binding('subCat.title')).isPresent()).toBe(true);
		});

		it('should show all quizzes in subcategories',function(){
			expect(element.all(by.repeater('quizz in quizzes')).count()).toEqual(2);
		});
	

	//	it('click on subcategory', function(){
	//		subcategory.get(0).click();
	//		expect(location).toMatch(subcatbrowz);
	//	});

	//	subcategory.count().toMatch(0).then(function(){
	//		console.log("There is no subcategories in this category");
	//	});

	//	it('click on quiz',function(){
	//		subcategory.get().quiz.click();
	//		expect(location).toMatch(subcatbrowz);
	//	});
	    


	    

	//    quizz.count().toMatch(0).then(function(){
	//    	console.log("There is no tests in this subcategory");
	//    });

	});
});