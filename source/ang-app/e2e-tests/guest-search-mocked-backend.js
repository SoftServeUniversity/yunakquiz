exports.httpBackendMock = function() {
  angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E']).run(function($httpBackend) {

    var allCategories = 
      [{"id":1,"category_id":0,"title":"Спорт"},
      {"id":2,"category_id":1,"title":"Футбол"},
      {"id":3,"category_id":1,"title":"Хокей"},
      {"id":4,"category_id":0,"title":"Історія"},
      {"id":5,"category_id":4,"title":"Історія України"},
      {"id":6,"category_id":4,"title":"Історія світу"},
      {"id":7,"category_id":0,"title":"Програмування"},
      {"id":8,"category_id":7,"title":"Основи ООП"},
      {"id":9,"category_id":7,"title":"Основи Java"}];

    $httpBackend.whenGET('http://localhost:9292/guest-search').respond(allCategories);
    $httpBackend.whenGET().passThrough();

  });
};
