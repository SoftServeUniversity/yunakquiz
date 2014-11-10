exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {

	var questions = [
		{"id": 1, "faq_question": "Як створити свій тест?", "faq_answer": "Для цього потрібно зареєструватись"},
		{"id": 2, "faq_question": "Де можна знайти інформацію про сайт?", "faq_answer": "В нижньому меню, яке називається Про Нас"},
		{"id": 3, "faq_question": "За якою шкалою оцінюється пройдений тест?", "faq_answer": "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні"},
		{"id": 4, "faq_question": "Де можна знайти тест на знання правил хокею?", "faq_answer": "В підкатегорії Хокей, яка знаходиться в категорії Спорт"},
		{"id": 5, "faq_question": "Чи можна для пошук вибрати якусь конкретну підкатегорію?", "faq_answer": "Так, звичайно."}
	];

    $httpBackend.whenGET('http://localhost:9292/faq').respond(questions);
	$httpBackend.whenGET().passThrough();
  });
};