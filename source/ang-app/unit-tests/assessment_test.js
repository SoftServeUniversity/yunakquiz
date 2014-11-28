'use strict';
describe("yunakQuiz.assessments", function() {
beforeEach(module('ngRoute'));
beforeEach(module('yunakQuiz.assessments'));

	describe('Templating', function() {
	        var $httpBackend,
	        location,
			route,
			rootScope;

			beforeEach(inject(
				function($rootScope, $route, _$httpBackend_, $location){
				location = $location;
				rootScope = $rootScope;
				route = $route;
				$httpBackend = _$httpBackend_;
			}));
			afterEach(function() {
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
				});
	    	it('loads quiz pass template', function() {
				$httpBackend.expectGET('modules/quiz/quiz_show.html').respond(200);
				location.path('/assessments/:quiz_id');
				rootScope.$digest();
				$httpBackend.flush();
			});
	    	it('loads quiz result template', function() {
				$httpBackend.expectGET('modules/quiz/quiz_result.html').respond(200);
				location.path('/assessments/:quiz_id/result');
				rootScope.$digest();
				$httpBackend.flush();
			});

			it('loads assessment create template', function() {
				$httpBackend.expectGET('modules/quiz/quiz_create.html').respond(200);
				location.path('/admin/assessments/create');
				rootScope.$digest(); 
				$httpBackend.flush();
			});
			it('loads assessment edit template', function() {
				$httpBackend.expectGET('modules/quiz/quiz_edit.html').respond(200);
				location.path('/admin/assessments/:quiz_id/');
				rootScope.$digest();
				$httpBackend.flush();
			});      
			it('loads assessment edit template', function() {
				$httpBackend.expectGET('modules/quiz/quiz_review.html').respond(200);
				location.path('/admin/assessments/review/:quiz_id');
				rootScope.$digest();
				$httpBackend.flush();
			});        
		});

	describe('Routing', function() {
    
		var location, route, rootScope, $httpBackend;
		beforeEach(inject(
			function($location, $route, $rootScope, _$httpBackend_) {
			location = $location;
			route = $route;
			rootScope = $rootScope;
			$httpBackend = _$httpBackend_
		}));
		
			it('assessment_show route should load the assessment_show page on successful load of...', function() {
				$httpBackend.expectGET('modules/quiz/quiz_show.html').respond(200);
				location.path('/assessments/:quiz_id');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizShowCtrl')
			});
		
			it('assessment_result route should load the assessment_result page on successful load of...', function() {
				$httpBackend.expectGET('modules/quiz/quiz_result.html').respond(200);
				location.path('/assessments/:quiz_id/result');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizResultCtrl')
			});
		
			it('assessment_create route should load the assessment_create page on successful load of...', function() {
				$httpBackend.expectGET('modules/quiz/quiz_create.html').respond(200);
				location.path('/admin/assessments/create');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizCreateCtrl')
			});
		
			it('assessment_result route should load the assessment_edit page on successful load of...', function() {
				$httpBackend.expectGET('modules/quiz/quiz_edit.html').respond(200);
				location.path('/admin/assessments/:quiz_id/');
				rootScope.$digest();
				expect(route.current.controller).toBe('QuizEditCtrl')
			});
	});
});