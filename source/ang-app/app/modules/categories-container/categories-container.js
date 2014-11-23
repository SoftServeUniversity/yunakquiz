(function () {
  var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

    app.factory("categoriesQuery", ['$http', 'CONFIG', function ($http, CONFIG) {
      return { 
        getParentCategories : function () {
          return $http.get(CONFIG.BASE_URL + '/categories/parent')
        },
        getSubCategories : function () {
          return $http.get(CONFIG.BASE_URL + '/categories/subcats')
        },
        getAllCategories : function () {
          return $http.get(CONFIG.BASE_URL + '/categories/all')
        },
        getCategoryById : function (id) {
          return $http.get(CONFIG.BASE_URL + '/categories/category/' + id)
        },
        getSubCatByParCatId : function (id) {
          return $http.get(CONFIG.BASE_URL + '/categories/subcat/' + id)
        }
      }
    }]);

    app.factory("quizesById", ['$http', 'CONFIG', function ($http, CONFIG) {
      return { 
        get : function () {
          return $http.get(CONFIG.BASE_URL + '/admin/assessments/all/published')
        },
       }
    }]);

    app.factory("groupById", function () {
      return function (target) {
        var groupedObjectById = {};

        angular.forEach(target, function (cat) {
          if(!groupedObjectById[cat.category_id]) {
            groupedObjectById[cat.category_id] = [];
          };
          groupedObjectById[cat.category_id].push(cat);
        });
        return groupedObjectById;
      }
    });

    app.factory("quizCount", ['groupById', 'quizesById', function (groupById, quizesById) {
      return function (subCats) {
        var testsCount = 0;
        var quizzesCount ={};
        var groupedQuizzes;
        var groupedSubcat = groupById(subCats);

        quizesById.get().success(function (quizzes) {
          groupedQuizzes = groupById(quizzes);
          //each of element is id of parCat and are key which have array of subcats 
          angular.forEach(groupedSubcat, function (cat, parcat) {
            testsCount = 0;//loop trougth each subcategory 
            angular.forEach(groupedSubcat[parcat], function (cat) { 
              if(groupedQuizzes[cat.id]){
                quizzesCount[cat.id] = groupedQuizzes[cat.id].length;//acumulating in new Obj quizzes count in parcat
                testsCount = testsCount + groupedQuizzes[cat.id].length;//acumulating in new Obj quizzes count in subcat
              };
            });
            quizzesCount[parcat] = testsCount;
          });
        });
        return quizzesCount;
      }
    }]);

    app.filter('limitStringTo', function () {
      return function (value, wordwise, max, tail) {
        if(!value) return '';
        max = parseInt(max, 10);
        if(!max) return value;
        if(value.length <= max) return value;
        value = value.substr(0, max);
        if(wordwise) {
          var lastspace = value.lastIndexOf(' ');
          if(lastspace != -1) {
            value = value.substr(0, lastspace);
          }
        }
        return value + (tail || ' …');
      };
    });

    app.directive('categoriesContainer', function () {
      return {
        restrict: 'E',
        templateUrl: './modules/categories-container/categories-container.html',
        controller: ['$http', '$scope', 'categoriesQuery', 'quizesById', 'groupById', 'quizCount',
          function ($http, $scope, categoriesQuery, quizesById, groupById, quizCount) {
            $scope.parCategories = {};
            $scope.subCategories = {};
            $scope.quizzesCount = {};

            categoriesQuery.getParentCategories().success(function (data) {
              $scope.parCategories = data; 
            });
            categoriesQuery.getSubCategories().success(function (subCats) {
              $scope.subCategories = groupById(subCats);//for each id of categories we get array of equal subcategories
              $scope.quizzesCount = quizCount(subCats);//.quizzesParCatCount;
            });
          }],
        controllerAs: 'parentCategoriesList'
      }
    });
})();
