exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {

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

    $httpBackend.whenGET('http://localhost:9292/categories/category/1').respond(category1);
	$httpBackend.whenGET('http://localhost:9292/categories/category/4').respond(category4);
	$httpBackend.whenGET('http://localhost:9292/categories/category/7').respond(category7);

	$httpBackend.whenGET('http://localhost:9292/categories/subcat/1').respond(subcategory1);
	$httpBackend.whenGET('http://localhost:9292/categories/subcat/4').respond(subcategory4);
	$httpBackend.whenGET('http://localhost:9292/categories/subcat/7').respond(subcategory7);

	$httpBackend.whenGET('http://localhost:9292/admin/assessments/all/published').respond(quizzes);
	$httpBackend.whenGET().passThrough();
  });
};