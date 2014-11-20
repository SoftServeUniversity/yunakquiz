(function (){
  var  app = angular.module('yunakQuiz.quizzescategoriesTabFactories' ,
    ['ngRoute']);

    app.factory("categoryEdit", ['$http', function ($http) {
      return { 
        create : function(data) {
          return $http.put('http://localhost:9292/admin/category/create', data)
        },
        update : function(data) {
          return $http.put('http://localhost:9292/admin/category/update', data)
        },
        delCat : function(data) {
          return $http.delete('http://localhost:9292/admin/category/delete/' + data)
        }
      }
    }]);
    app.factory("pwdCheck", ['$http', function ($http) {
      return function(pwd){
        var request = {password:pwd};

        return $http.post('http://localhost:9292/checkpassword/', request)
      };
    }]);
    app.factory("addParCatTitle", function(){
      return function(target){
        var catsById = {};
        var catsAsArray = [];

        angular.forEach(target, function(cat, key){
         catsById[cat.id] = cat;
        });
        angular.forEach(catsById, function(cat, key){
          if(cat.category_id!=0){
            if(!catsById[cat.category_id]) {
             catsById[cat.category_id] = {};
             catsById[cat.category_id].title = "error in DB";
            } else {
            cat.parCatTitle = catsById[cat.category_id].title;
            catsAsArray.push(cat);
            }
          } else {
            cat.parCatTitle = '---';
            catsAsArray.push(cat);
          }
      });
      return catsAsArray;
      }
    });

    app.factory("doCatHaveSubCat", function(){
      return function (category, categoriesList, subCategoriesList){
        var result = false;
          angular.forEach(categoriesList, function(cat, key){
            if(cat.category_id != 0 && cat.category_id == category.id){
              subCategoriesList.push(cat);
              result = true;
            };
          });
        return {haveCats: result, subCatsList:subCategoriesList} ;
      }
    });

    app.factory("getParCats", function(){
      return function (target){
        var parCats = [];

          angular.forEach(target, function(cat, key){
            if(cat.category_id === 0){
              parCats.push(cat);
            };
          });
        return parCats;
      }
    });

    app.factory("getSubCats", function(){
      return function (target){
        var subCats = [];

          angular.forEach(target, function(cat, key){
            if(cat.category_id != 0){
              subCats.push(cat);
            };
          });
        return subCats;
      };
    });

    app.factory("addDefaultOption", function(){
      return function (categoriesList, optionByBindName){
        var defaultToCreate = {id:0, category_id:0, title:"---"};
          
          categoriesList.push(defaultToCreate);
          optionByBindName = categoriesList[categoriesList.length-1];
          return optionByBindName;
      };
    });

    app.factory("setCurCatEditDlg", function(){
      return function (category, parCatGrouped){
        var selectedSubParCat = {};

        angular.forEach(parCatGrouped, function(cat, key){
          if(cat.id === category.category_id) {
            selectedSubParCat = parCatGrouped[key];
          }
        })
        return selectedSubParCat;
      };
    });
})();
