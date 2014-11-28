exports.httpBackendMock = function() {
		angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
	.run(function($httpBackend){
		var subcategory = [{"id":6,"category_id":4,"title":"Історія світу","created_at":"2014-11-24T20:41:24.498Z","updated_at":"2014-11-24T20:41:24.498Z"}];
		var quizzes = [
			{"id":11,"category_id":6,"user_id":5,"title":"Тест на знання війни в Вєтнамі","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:34:38.759Z","updated_at":"2014-11-17T22:34:42.564Z","quiz_id":11,"allTags":"вєтнам гвинтокрил напалм"},
			{"id":8,"category_id":6,"user_id":5,"title":"Тест на знання першої світової війни","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:34:27.949Z","updated_at":"2014-11-17T22:34:31.142Z","quiz_id":8,"allTags":"перша_світова війна німеччина"},
			{"id":7,"category_id":6,"user_id":5,"title":"Тест на знання другої світової війни","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:34:24.532Z","updated_at":"2014-11-17T22:34:27.897Z","quiz_id":7,"allTags":"гітлер сталін голодомор друга_світова"},
			{"id":6,"category_id":6,"user_id":5,"title":"Тест на знання історії світу","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:34:21.166Z","updated_at":"2014-11-17T22:34:24.480Z","quiz_id":6,"allTags":"світ історія всьо"},
			{"id":3,"category_id":6,"user_id":6,"title":"Друга світова війна","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:34:12.350Z","updated_at":"2014-11-17T22:34:14.944Z","quiz_id":3,"allTags":"історія світ"},
			{"id":15,"category_id":6,"user_id":5,"title":"Тест на знання першої світових воєн","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:32:27.949Z","updated_at":"2014-11-17T22:32:31.142Z","quiz_id":15,"allTags":"історія друга_світова перша_світова"},
			{"id":16,"category_id":6,"user_id":5,"title":"Тест на знання світових воєн","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:30:27.949Z","updated_at":"2014-11-17T22:30:31.142Z","quiz_id":16,"allTags":"історія друга_світова перша_світова"},
			{"id":18,"category_id":6,"user_id":5,"title":"Тест на знання історії Європи","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:26:27.949Z","updated_at":"2014-11-17T22:26:31.142Z","quiz_id":18,"allTags":"німеччина історія"},
			{"id":19,"category_id":6,"user_id":5,"title":"Тест на знання історії Німеччини","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:24:27.949Z","updated_at":"2014-11-17T22:24:31.142Z","quiz_id":19,"allTags":"історія німеччина"},
			{"id":20,"category_id":6,"user_id":5,"title":"Тест на знання історії України в часи 2 св війни","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-17T22:22:27.949Z","updated_at":"2014-11-17T22:22:31.142Z","quiz_id":20,"allTags":"друга_світова батьківщина історія"}
		];
		

		var search_request1 = "гітлер";
		
		var search_result1 = {"result":[{"allTags":"сталін історія гітлер","id":26,"category_id":6,"user_id":16,"title":"Тест на знання історії України у складі СРСР","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-27T00:44:39.102Z","updated_at":"2014-11-27T00:44:43.236Z"},{"allTags":"перша_світова історія гітлер сталін","id":18,"category_id":6,"user_id":16,"title":"Тест на знання історії другої світової війни","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-27T00:44:01.463Z","updated_at":"2014-11-27T00:44:08.488Z"}],"length":2};
		
		var search_request2 = "голодомор сталін";

		var search_result2 = {"result":[{"allTags":"сталін історія голодомор","id":25,"category_id":6,"user_id":16,"title":"Тест на знання історії голодомору в Україні","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-27T00:44:35.104Z","updated_at":"2014-11-27T00:44:38.940Z"}],"length":1};
		
		$httpBackend.whenGET('http://localhost:9292/categories/category/6').respond(subcategory);
		$httpBackend.whenGET('http://localhost:9292/last_quizzes/6').respond(quizzes);
		$httpBackend.whenGET().passThrough();
	});
};
