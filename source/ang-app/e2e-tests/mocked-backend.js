exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {
    $httpBackend.whenPOST("http://localhost:9292/register", {username: 'Inokentiy', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf', birthday: '2014-10-08'})
    .respond([400, {"username":["has already been taken"]}]);

    $httpBackend.whenGET('http://localhost:9292/categories/1').respond(category1);
	$httpBackend.whenGET('http://localhost:9292/categories/3').respond(category3);
	$httpBackend.whenGET('http://localhost:9292/categories/4').respond(category4);

	$httpBackend.whenGET('http://localhost:9292/categories/subcat/1').respond(subcategory1);
	$httpBackend.whenGET('http://localhost:9292/categories/subcat/3').respond(subcategory3);
	$httpBackend.whenGET('http://localhost:9292/categories/subcat/4').respond(subcategory4);

	$httpBackend.whenGET('http://localhost:9292/quizzes/0').respond(quizzes);
	$httpBackend.whenGET().passThrough();
  });
};