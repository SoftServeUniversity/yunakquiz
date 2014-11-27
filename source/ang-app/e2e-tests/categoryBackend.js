exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {

    var categories = {
 		'1': [{"id": 1, "category_id": 0, "title": "Cпорт"}],
 		'4': [{"id": 4, "category_id": 0, "title": "Історія"}],
 		'7': [{"id": 7, "category_id": 0, "title": "Програмування"}]
 	};

	var subcategories = {
		'1': [{"id": 2, "category_id": 1, "title": "Футбол"}, {"id": 3, "category_id": 1, "title": "Хокей"}],
		'4': [{"id": 5, "category_id": 4, "title": "Історія України"}, {"id": 6, "category_id": 4, "title": "Історія світу"}],
		'7': [{"id": 8, "category_id": 7, "title": "Основи ООП"}, {"id": 9, "category_id": 7, "title": "Основи Java"}]
	};

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

	var quizz = {
		'2': [{"id": 10, "category_id": 2, "title": "Тест на знання видатних футболістів"}],
		'3': [{"id": 9, "category_id": 3, "title": "Тест на знання правил хокею"}],
		'5': [{"id": 1, "category_id": 5, "title": "Тест на знання правил футболу"},
		  	  {"id": 2, "category_id": 5, "title": "Тест на знання історії України"},
			  {"id": 12, "category_id": 5, "title": "Тест на знання революції гідності 2014 року"},
			  {"id": 13, "category_id": 5, "title": "Тест на знання Украйни в часи незалежності"}],
		'6': [{"id": 3, "category_id": 6, "title": "Друга світова війна"},
			  {"id": 6, "category_id": 6, "title": "Тест на знання історії світу"},
			  {"id": 7, "category_id": 6, "title": "Тест на знання другої світової війни"},
			  {"id": 8, "category_id": 6, "title": "Тест на знання першої світової війни"},
			  {"id": 11, "category_id": 6, "title": "Тест на знання війни в Вєтнамі"}],
		'8': [{"id": 14, "category_id": 8, "title": "Тест на знання Поліморфізму"}],
		'9': [{"id": 4, "category_id": 9, "title": "Історія Java"},
			  {"id": 5, "category_id": 9, "title": "Базові знання Java"}]
	};

    $httpBackend.whenGET('http://localhost:9292/categories/category/' + id).respond(categories[id]);
	$httpBackend.whenGET('http://localhost:9292/categories/subcat/' + id).respond(subcategories[id]);

	$httpBackend.whenGET('http://localhost:9292/admin/assessments/all/published').respond(quizzes);
	$httpBackend.whenGET().passThrough();
  });
};