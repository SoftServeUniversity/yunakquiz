exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {

    var categories = [
    	{"id": 1, "category_id": 0, "title": "Cпорт"}, 
    	{"id": 2, "category_id": 1, "title": "Футбол"},
    	{"id": 3, "category_id": 0, "title": "Комп'ютери"},
    	{"id": 4, "category_id": 0, "title": "Туризм"},
    	{"id": 5, "category_id": 4, "title": "Країни"}
    	];
	
	var quizzes = [
		{"id": 1, "category_id": 2, "title": "Тест на знання правил футболу"},
		{"id": 2, "category_id": 6, "title": "Тест на знання правил хокею"},
		{"id": 3, "category_id": 8, "title": "Тест на знання комплектуючих"},
		{"id": 4, "category_id": 9, "title": "Тест на знання програмування"},
		{"id": 5, "category_id": 10, "title": "Тест на знання мереж"},
		{"id": 6, "category_id": 10, "title": "Тест на знання мережевих протоколів"},
		{"id": 7, "category_id": 5, "title": "Тест на знання географії"},
		{"id": 8, "category_id": 6, "title": "Тест про проходження хокею"},
		{"id": 9, "category_id": 6, "title": "Тест про історію хокею"},
		{"id": 10, "category_id": 6, "title": "Тест відомих хокеїстів світу"},
		{"id": 11, "category_id": 6, "title": "Тест про історію хокею в Україні"},
		{"id": 12, "category_id": 6, "title": "Тест про хокеїстів України"},
		{"id": 13, "category_id": 6, "title": "Тест на знання правил"}
	];

 	var quiz = {"id":"1","title":"Тест на знання правил футболу","category_id":2,"description":"Детальний опис тесту","questions":[{"id":1,"quiz_id":1,"title":"Скільки гравців в команді?","description":"demo","created_at":"2014-10-13T21:41:36.547Z","updated_at":"2014-10-13T21:41:36.547Z","answers":[{"id":1,"question_id":1,"title":"11","correct":true},{"id":2,"question_id":1,"title":"12","correct":false},{"id":3,"question_id":1,"title":"5","correct":false}]},{"id":2,"quiz_id":1,"title":"Скільки триває один тайм?","description":"demo","created_at":"2014-10-13T21:41:36.570Z","updated_at":"2014-10-13T21:41:36.570Z","answers":[{"id":4,"question_id":2,"title":"20хв","correct":false},{"id":5,"question_id":2,"title":"45хв","correct":true},{"id":6,"question_id":2,"title":"до останнього гравця","correct":false}]},{"id":3,"quiz_id":1,"title":"Що відбудеться, коли гравець торкнеться м’яча рукою?","description":"demo","created_at":"2014-10-13T21:41:36.603Z","updated_at":"2014-10-13T21:41:36.603Z","answers":[{"id":7,"question_id":3,"title":"Порушенння правил","correct":true},{"id":8,"question_id":3,"title":"Штрафний удар","correct":true},{"id":9,"question_id":3,"title":"Дадуть пиріжок","correct":false},{"id":10,"question_id":3,"title":"Дадуть в голову","correct":false}]}]} 
 	var comments = [{"id":1,"quiz_id":1,"text":"Дуже гарний тест","created_at":"2014-10-29T12:32:03.588Z","updated_at":"2014-10-29T12:32:03.588Z"},{"id":2,"quiz_id":1,"text":"Потрыбно додати питання із декількома правильними відповідями","created_at":"2014-10-29T12:32:03.742Z","updated_at":"2014-10-29T12:32:03.742Z"}]

    $httpBackend.whenGET('http://localhost:9292/assessments/1').respond(quiz);
    $httpBackend.whenGET('http://localhost:9292/admin/assessments/1').respond(quiz);
 	$httpBackend.whenGET('http://localhost:9292/admin/assessments/1/comments').respond(comments);

 	$httpBackend.whenPUT('http://localhost:9292/admin/assessments/1')
 		.respond(function(method, url, data, headers){
 			
	 		quiz.description = (JSON.parse(data)).description

	 		// quiz = angular.toJson(quiz);
 			return [200, quiz, {}];			
 		});

    $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
 

    $httpBackend.whenGET(/^\w+.*/).passThrough();
    // $httpBackend.whenPOST(/^\w+.*/).passThrough();
 
    //  $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
    // var quiz = angular.fromJson(data);
    // phones.push(quiz);
    // return [200, quiz, {}];
   
	
  });
};