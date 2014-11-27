exports.httpBackendMock = function() {
	angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function($httpBackend) {

    var quizzes ={"quizzes":[{"id":6,"category_id":6,"user_id":16,"title":"Знання історії світу","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-25T14:04:33.090Z","updated_at":"2014-11-25T14:04:36.348Z","category":{"title":"Історія світу","category":{"title":"Історія"}},"user":{"username":"Valera"}},{"id":7,"category_id":6,"user_id":16,"title":"Знання другої світової війни","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-25T14:04:36.509Z","updated_at":"2014-11-25T14:04:39.957Z","category":{"title":"Історія світу","category":{"title":"Історія"}},"user":{"username":"Valera"}},{"id":8,"category_id":6,"user_id":16,"title":"Знання першої світової війни","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-25T14:04:40.147Z","updated_at":"2014-11-25T14:04:43.362Z","category":{"title":"Історія світу","category":{"title":"Історія"}},"user":{"username":"Valera"}},{"id":9,"category_id":3,"user_id":16,"title":"Правила хокею","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-25T14:04:43.531Z","updated_at":"2014-11-25T14:04:46.643Z","category":{"title":"Хокей","category":{"title":"Спорт"}},"user":{"username":"Valera"}},{"id":10,"category_id":2,"user_id":16,"title":"Видатні футболісти","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.","status":"published","created_at":"2014-11-25T14:04:46.809Z","updated_at":"2014-11-25T14:04:50.176Z","category":{"title":"Футбол","category":{"title":"Спорт"}},"user":{"username":"Valera"}}],"totalItems":9};
    var permission = ["Moder_cabinet","Moder_published","Moder_review","Moder_enhance","Moder_review_quiz","User_cabinet","User_published","User_enhance","User_review","User_draft","User_profile","User_create_quiz","User_edit_quiz","User_statistic","menuPersonalCabinet","menuModerationCabinet"];
    // var pwdCorrect = {password: '12345678'};

    $httpBackend.whenGET('http://localhost:9292/permission').respond(permission);
    $httpBackend.whenPOST('http://localhost:9292/assessments/draft').respond(quizzes);
    $httpBackend.whenPOST('http://localhost:9292/assessments/published').respond(quizzes);
    $httpBackend.whenPOST('http://localhost:9292/assessments/moderator/published').respond(quizzes);
    $httpBackend.whenPOST('http://localhost:9292/checkpassword/').respond(function(method, url, data, headers){
        if ("12345678"==data) {
              return [200, "ок"];         
            } 
        else{
              return [400, "Невірний пароль"];
            }
        });
    $httpBackend.whenDELETE('http://localhost:9292/admin/assessments/6')
    .respond(function(method, url, data, headers){
              return [200, "ок"];         
            });
    $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
    $httpBackend.whenGET(/^\w+.*/).passThrough();
    $httpBackend.whenGET().passThrough();

  });
};