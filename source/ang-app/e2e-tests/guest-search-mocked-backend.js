'use strict';

exports.httpBackendMock = function() {
  angular.module('httpBackendMock', 
    ['yunakQuiz', 'ngMockE2E']).run(function($httpBackend) {

    var allCategories = [{"id":1,"category_id":0,"title":"Спорт"},
      {"id":2,"category_id":1,"title":"Футбол"},
      {"id":3,"category_id":1,"title":"Хокей"},
      {"id":4,"category_id":0,"title":"Історія"},
      {"id":5,"category_id":4,"title":"Історія України"},
      {"id":6,"category_id":4,"title":"Історія світу"},
      {"id":7,"category_id":0,"title":"Програмування"},
      {"id":8,"category_id":7,"title":"Основи ООП"},
      {"id":9,"category_id":7,"title":"Основи Java"}];

    postResult = {"result":[{"allTags":"історія світ","id":3,"category_id":6,
    "user_id":null,"title":"Друга світова війна",
    "description":"Детальний опис тесту","status":"published",
    "created_at":"2014-11-07T16:17:40.796Z",
    "updated_at":"2014-11-07T16:17:40.796Z"},
    {"allTags":"світ історія всьо","id":6,"category_id":6,"user_id":null,
    "title":"Тест на знання історії світу",
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
    Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et \
    nisl. Ut vulputate efficitur.","status":"published",
    "created_at":"2014-11-07T16:17:41.336Z",
    "updated_at":"2014-11-07T16:17:41.336Z"}],"length":2};

    $httpBackend.whenGET('http://localhost:9292/categories/all').respond(allCategories);
    $httpBackend.whenGET().passThrough();

    $httpBackend.whenPOST('http://localhost:9292/search').respond(postResult);

  });
};
