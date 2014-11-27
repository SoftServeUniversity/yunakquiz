exports.httpBackendMock = function () {
    angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E'])
    .run(function ($httpBackend) {
  
    var parCategoryMock = 
      [
       {"id": 1, "category_id": 0 ,"title": "Спорт"},
       {"id": 3, "category_id": 0 ,"title": "Комп'ютери"},
       {"id": 4, "category_id": 0 ,"title": "Туризм"}
      ];
    var subCategoryMock = 
      [
       {"id": 2,"category_id": 1, "title": "Футбол"},
       {"id": 5,"category_id": 4, "title": "Країни"},
       {"id": 6,"category_id": 1, "title": "Хокей"},
       {"id": 7,"category_id": 1, "title": "Баскетбол"},
       {"id": 8,"category_id": 3, "title": "Комплектуючі"},
       {"id": 9,"category_id": 3, "title": "Програмування"},
       {"id": 10,"category_id": 3, "title": "Мережі"},
       {"id": 11,"category_id": 4, "title": "Столиці"},
       {"id": 12,"category_id": 4, "title": "Гори"}];
    var allCatsMock =
      [
       {"id": 1,"category_id": 0, "title": "Спорт"},
       {"id": 2,"category_id": 1, "title": "Футбол"},
       {"id": 3,"category_id": 0, "title": "Комп'ютери"},
       {"id": 4,"category_id": 0, "title": "Туризм"},
       {"id": 5,"category_id": 4, "title": "Країни"},
       {"id": 6,"category_id": 1, "title": "Хокей"},
       {"id": 7,"category_id": 1, "title": "Баскетбол"},
       {"id": 8,"category_id": 3, "title": "Комплектуючі"},
       {"id": 9,"category_id": 3, "title": "Програмування"},
       {"id": 10,"category_id": 3, "title": "Мережі"},
       {"id": 11,"category_id": 4, "title": "Столиці"},
       {"id": 12,"category_id": 4, "title": "Гори"}
      ];
    var quizzesMock = 
      [
       {"id": 1, "category_id": 2},
       {"id": 2, "category_id": 6},
       {"id": 3, "category_id": 8},
       {"id": 4, "category_id": 9},
       {"id": 5, "category_id": 10},
       {"id": 6, "category_id": 10},
       {"id": 7, "category_id": 5},
       {"id": 8, "category_id": 6},
       {"id": 9, "category_id": 6},
       {"id": 10, "category_id": 6},
       {"id": 11, "category_id": 6},
       {"id": 12, "category_id": 6},
       {"id": 13, "category_id": 6}
      ];
    var contactsMock = 
      [
       {"id": 1, "role": "Адміністратор", "phone": "+38 032 244-44-44",
        "address": "79000, Fedkovycha Str. 60A, building 1", "mail": "someone@somemail.com"},
       {"id": 2, "role": "Модератор", "phone": "+38 032 244-44-44",
        "address": "79000, Fedkovycha Str. 60A, building 1", "mail": "someone@somemail.com"},
       {"id": 3, "role": "Ще хтось", "phone": "+38 032 244-44-44",
        "address": "79000, Fedkovycha Str. 60A, building 1", "mail": "someone@somemail.com"}
      ];
    var aboutUsMock = [{"id": 1, "about_us": "<h5>ABOUT US WORKS</h5>"}];

    var allCategories = 
      [
       {"id": 1, "category_id": 0, "title": "Спорт"},
       {"id": 2, "category_id": 1, "title": "Футбол"},
       {"id": 3, "category_id": 1, "title": "Хокей"},
       {"id": 4, "category_id": 0, "title": "Історія"},
       {"id": 5, "category_id": 4, "title": "Історія України"},
       {"id": 6, "category_id": 4, "title": "Історія світу"},
       {"id": 7, "category_id": 0, "title": "Програмування"},
       {"id": 8, "category_id": 7, "title": "Основи ООП"},
       {"id": 9, "category_id": 7, "title": "Основи Java"}
      ];
      
    var permission = ["adminUsersTab", "adminBlackListTab", "adminAdministrationTab", "adminModeratorsTab", "adminCategoriesTab", "adminAboutUsTab", "adminFAQ"];
    var pwdCorrect = {password: '12345678'};
    var user = {
      "id":1,
      "username":"tfilonych",
      "first_name":"Tanya",
      "last_name":"Filonych",
      "password": "12345678",
      "email":"tfilonych@mail.ru",
      "birthday":"1989-12-31T22:00:00.000Z",
      "plast_hovel":"some",
      "plast_region":"Lviv",
      "plast_level":"досвідчений"};

    $httpBackend.whenGET('http://localhost:9292/categories/parent').respond(parCategoryMock);
    $httpBackend.whenGET('http://localhost:9292/categories/subcats').respond(subCategoryMock);
    $httpBackend.whenGET('http://localhost:9292/admin/assessments/all/published').respond(quizzesMock);
    $httpBackend.whenGET('http://localhost:9292/about_us').respond(aboutUsMock);
    $httpBackend.whenGET('http://localhost:9292/contacts').respond(contactsMock);
    $httpBackend.whenGET('http://localhost:9292/guest-search').respond(allCategories);
    $httpBackend.whenGET('http://localhost:9292/permission').respond(permission);
    $httpBackend.whenGET('http://localhost:9292/categories/all').respond(allCatsMock);
    $httpBackend.whenPUT('http://localhost:9292/about_us').respond("succes");
    $httpBackend.whenPOST('http://localhost:9292/checkpassword/', pwdCorrect).respond("Password Match");
    $httpBackend.whenPUT('http://localhost:9292/admin/category/create').respond("succes");
    $httpBackend.whenGET('http://localhost:9292/access').respond(user);
    $httpBackend.whenDELETE('http://localhost:9292/user', user)
    .respond(function(method, url, data, headers){ return [200, "ok", {}];  
    });
    $httpBackend.whenPUT('http://localhost:9292/user')
    .respond(function(method, url, data, headers){ return [200, "ok", {}];         
    });   
    $httpBackend.whenGET().passThrough();
  });
};