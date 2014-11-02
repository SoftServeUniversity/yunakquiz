(function (){
  var  app = angular.module('yunakQuiz.quizzescategoriesTab' ,['ngRoute','yunakQuiz.categoriesContainer']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/quizzescategoriesTab', {
            templateUrl: './modules/administration_panel/quizzes_categories_tab.html',
            controller: 'quizzescategoriesTab'
          })
      }
    ]);
    app.factory("categoryAction", ['$http', function ($http) {
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

    app.controller('quizzescategoriesTab', 
      ['$http', '$scope','catsById', 'categoryAction', function ($http, $scope, catsById, categoryAction){
      $scope.tab = 'quizzescategoriesTab';
      $scope.categories = {};
      $scope.currentCategory = {};
      $scope.currentCatToEdit = {};
      $scope.catToDelete = {};
      $scope.catToEdit = {};
      $scope.subParCatSelect = {};
      $scope.parCatGrouped = {};

      updateCatPage();

      $scope.addCategory = function(){
        var request = {id:$scope.subParCatSelect.id, title:$scope.currentCategory.title};

        categoryAction.create(request).success(function(data){
          $("#addCatModal").modal("hide");
          updateCatPage();
          $scope.clearForm();
        }).error(function(data){
           alert("Така категорія вже існує");
        });
      };

      $scope.updateCategory = function(){
        var request = 
        {id: $scope.currentCatToEdit.id,
         category_id: $scope.subParCatSelect.id,
         title: $scope.catToEdit.title};
         
        categoryAction.update(request).success(function(data){
          $("#editCatModal").modal("hide");
          updateCatPage();
          $scope.clearForm();
        }).error(function(data){
          alert("Something Went wrong");
        });
      };

      $scope.deleteCategory = function(){
        var request = $scope.catToDelete.id;
        console.log(request);
        
        categoryAction.delCat(request).success(function(data){
          $("#deleteCatModal").modal("hide");
          updateCatPage();
        }).error(function(data){
          alert("Something Went wrong");
        });
      };

      $scope.showDeleteCatDlg = function(category){
        jQuery.extend($scope.catToDelete,category);
        setCurCatEditCatDlg(category);
        if(doCatHaveSubCat($scope.catToDelete)){
          alert("Увага, батьківська категорія має підкатегорії");
          
        }
        $("#deleteCatModal").modal("show");
      };
      $scope.showEditCatDlg = function(category){
        jQuery.extend($scope.currentCatToEdit,category);
        jQuery.extend($scope.catToEdit,category); //we do not need two way data binding here
        setCurCatEditCatDlg(category);
        if(doCatHaveSubCat($scope.catToEdit)){
          alert("Увага, батьківська категорія має підкатегорії");
          $("#selSubCatEdit").prop('disabled', true);
        }
        $("#editCatModal").modal("show");
      };
      function doCatHaveSubCat(category){
        var result = false;
          angular.forEach($scope.categories, function(cat, key){
            if(cat.category_id != 0 && cat.category_id == category.id){
              result = true;
            };
          })
          return result;
        };
      function setCurCatEditCatDlg(category){
        angular.forEach($scope.parCatGrouped, function(cat, key){
          if(cat.id == category.category_id) {
            $scope.subParCatSelect = $scope.parCatGrouped[key];
          }
        })
      };

      $scope.clearForm = function(){
        $scope.currentCategory = {};
        $scope.subParCatSelect = $scope.parCatGrouped[$scope.parCatGrouped.length-1];
        $scope.categoryAddition.$setPristine();
        $scope.editCat.$setPristine();
        $scope.currentCatToEdit = {};
        $("#selSubCatEdit").prop('disabled', false);
      };
      
      function getParCats(target){
        var parCats = [];

          angular.forEach(target, function(cat, key){
            if(cat.category_id === 0){
              parCats.push(cat);
            };
          });
        return parCats;
      };

      function addDefaultOption(target, optionByBindName){
        var defaultToCreate = {id:0, category_id:0, title:"---"};
          
          target.push(defaultToCreate);
          optionByBindName = target[target.length-1];
          return optionByBindName;
      };

      function updateCatPage(){
        catsById.get('all').success(function(data){
          $scope.parCatGrouped = getParCats(data);
          $scope.subParCatSelect = addDefaultOption($scope.parCatGrouped, $scope.subParCatSelect);
          $scope.categories = addParCatTitle(data);
        });
      };
      function addParCatTitle(target){
        var catsById = {};
        var catsAsArray = [];

        angular.forEach(target, function(cat, key){
          catsById[cat.id] = cat;
        });
        angular.forEach(catsById, function(cat, key){
          if(cat.category_id != 0){
            cat.parCatTitle = catsById[cat.category_id].title;
          } else {
          cat.parCatTitle = '---';
          };
        });
        angular.forEach(target, function(cat, key){
          catsAsArray.push(cat);
        });
        return catsAsArray;
      };
    }]);
})();
