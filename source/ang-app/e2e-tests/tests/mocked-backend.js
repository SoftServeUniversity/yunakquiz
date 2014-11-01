exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {
    	$httpBackend.whenPOST("http://localhost:9292/register", {username: 'Inokentiy', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf', birthday: '2014-10-08'})
    	.respond([400, {"username":["has already been taken"]}]);
    
    $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
    $httpBackend.whenGET(/^\w+.*/).passThrough();
	$httpBackend.whenGET().passThrough();
  });
};