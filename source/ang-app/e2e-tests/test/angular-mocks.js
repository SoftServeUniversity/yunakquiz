describe('back-end function', function() {

	exports.httpBackendMock = function() {
		angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {
	
    var category1 = [{id: 1, category_id: 0, title: "Cпорт"}];
	var category3 = [{id: 3, category_id: 0, title: "Комп'ютери"}];
	var category4 = [{id: 4, category_id: 0, title: "Туризм"}];
	var categoryAll = [category1, category3, category4];

	var subcategory1 = [{id: 2, category_id: 1, title: "Футбол"}, {id: 6, category_id: 1, title: "Хокей"},{id: 7, category_id: 1, title: "Баскетбол"}];
	var subcategory3 = [{id: 8, category_id: 3, title: "Комплектуючі"}, {id: 9, category_id: 3, title: "Програмування"},{id: 10, category_id: 3, title: "Мережі"}];
	var subcategory4 = [{id: 5, category_id: 4, title: "Країни"}, {id: 11, category_id: 4, title: "Столиці"},{id: 12, category_id: 4, title: "Гори"}];

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

    $httpBackend.whenGET('/categories/1').respond(category1);
	$httpBackend.whenGET('/categories/3').respond(category3);
	$httpBackend.whenGET('/categories/4').respond(category4);

	$httpBackend.whenGET('/categories/subcat/1').respond(subcategory1);
	$httpBackend.whenGET('/categories/subcat/3').respond(subcategory3);
	$httpBackend.whenGET('/categories/subcat/4').respond(subcategory4);

	$httpBackend.whenGET('/quizzes/2').respond(quizzes2);
	$httpBackend.whenGET('/quizzes/5').respond(quizzes5);
	$httpBackend.whenGET('/quizzes/6').respond(quizzes6);
	$httpBackend.whenGET('/quizzes/7').respond(quizzes7);
	$httpBackend.whenGET('/quizzes/8').respond(quizzes8);
	$httpBackend.whenGET('/quizzes/9').respond(quizzes9);
	$httpBackend.whenGET('/quizzes/10').respond(quizzes10);
	$httpBackend.whenGET('/quizzes/11').respond(quizzes11);
	$httpBackend.whenGET('/quizzes/12').respond(quizzes12);

	$httpBackend.whenGET().passThrough();
  });
  };
});