(function (){
  var  app = angular.module('yunakQuiz.quizzescategoriesTabFactories' ,
    ['ngRoute']);

    app.factory("categoryEdit", ['$http', 'CONFIG', function ($http, CONFIG) {
      return { 
        create : function (data) {
          return $http.put(CONFIG.BASE_URL + '/admin/category/create', data)
        },
        update : function (data) {
          return $http.put(CONFIG.BASE_URL + '/admin/category/update', data)
        },
        delCat : function (data) {
          return $http.delete(CONFIG.BASE_URL + '/admin/category/delete/' + data)
        }
      }
    }]);
    app.factory("pwdCheck", ['$http', 'CONFIG', function ($http, CONFIG) {
      return function (pwd) {
        var request = {password: pwd};

        return $http.post(CONFIG.BASE_URL + '/checkpassword/', request)
      };
    }]);

    app.factory("modalDlg", ['$modal', function ($modal) {
      return function (modAlias, $scope) {
        var templateUrl = {
          createCat: 'modules/administration_panel/modalCreateCat.html',
          deleteCat: 'modules/administration_panel/modalDeleteCat.html',
          editCat: 'modules/administration_panel/modalEditCat.html'
        };
          return $modal.open({
                  templateUrl: templateUrl[modAlias],
                  controller: 'modalEditDelCreateCatCtrl',
                  windowClass: 'category-edit-modal',
                  scope: $scope
                 });
      };
    }]);

    app.factory("addParCatTitle", function () {
      return function (categories) {
        var catsById = {};
        var catsAsArray = [];

        angular.forEach(categories, function (cat) {
         catsById[cat.id] = cat;
        });
        angular.forEach(catsById, function (cat) {
          if(cat.category_id != 0) {
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

    app.factory("doCatHaveSubCat", function () {
      return function (category, categoriesList, subCategoriesList) {
        var result = false;
          angular.forEach(categoriesList, function (cat) {
            if(cat.category_id != 0 && cat.category_id == category.id) {
              subCategoriesList.push(cat);
              result = true;
            };
          });
        return {haveCats: result, subCatsList:subCategoriesList};
      }
    });

    app.factory("getParCatsList", function () {
      return function (categories) {
        var parCats = [];

          angular.forEach(categories, function (cat) {
            if(cat.category_id === 0) {
              parCats.push(cat);
            };
          });
        return parCats;
      }
    });

    app.factory("getSubCatsList", function () {
      return function (categories) {
        var subCats = [];

          angular.forEach(categories, function (cat) {
            if(cat.category_id != 0) {
              subCats.push(cat);
            };
          });
        return subCats;
      };
    });

    app.factory("addSelectorForParCat", function () {
      return function (categoriesList, optionByBindName) {
        var defaultToCreate = {
            id:0,
            category_id:0,
            title:"---"
        };

          categoriesList.push(defaultToCreate);
          optionByBindName = categoriesList[categoriesList.length-1];
          return optionByBindName;
      };
    });

    app.factory("setCurCatEditDlg", function () {
      return function (category, parCatGrouped) {
        var selectedSubParCat = {};

          angular.forEach(parCatGrouped, function (cat, index) {
            if(cat.id === category.category_id) {
              selectedSubParCat = parCatGrouped[index];
            }
          })
          return selectedSubParCat;
      };
    });
})();
