(function (){
  var  app = angular.module('yunakQuiz.quizzescategoriesTab' ,
    ['ngRoute','yunakQuiz.categoriesContainer','yunakQuiz.permission','yunakQuiz.quizzescategoriesTabFactories']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/quizzescategoriesTab', {
            templateUrl: './modules/administration_panel/quizzes_categories_tab.html',
            controller: 'quizzescategoriesTabCtrl'
          })
      }
    ]);

    app.controller("modalEditDelCreateCatCtrl",['$modalInstance','$scope', '$http', 'categoryEdit','pwdCheck', 
      function($modalInstance, $scope, $http, categoryEdit, pwdCheck){
      $scope.currentCategory = {};

      $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      };

      $scope.submit = function(){
        $modalInstance.close();
      };

      $scope.updateCategory = function(){
        var request = 
          {id: $scope.catToEditDelete.id,
           category_id: $scope.subParCatSelect.id,
           title: $scope.catToEditDelete.title
          };
          pwdCheck($scope.pwdInput).success(function(){
            categoryEdit.update(request).success(function(data){
              $scope.submit();
            }).error(function(data){
              $scope.errorModalMsg = $scope.catEditServerErr;
              $scope.pwdInput = '';
            });
          }).error(function(){
            $scope.pwdPlaceHolder = $scope.pwdInputErr;
            $scope.pwdInput = '';
          });
      };

      $scope.createCategory = function(){
        var request = {id:$scope.subParCatSelect.id, title:$scope.currentCategory.title};
        
          pwdCheck($scope.pwdInput).success(function(){
            categoryEdit.create(request).success(function(data){
            $scope.submit();
            })
            .error(function(data){
              $scope.errorModalMsg = $scope.catExistErr;
              $scope.pwdInput = '';
            });
          }).error(function(){
            $scope.pwdPlaceHolder = $scope.pwdInputErr;
            $scope.pwdInput = '';
          });
      };

      $scope.deleteCategory = function(){
        var request = $scope.catToEditDelete.id;

          pwdCheck($scope.pwdInput).success(function(){
            categoryEdit.delCat(request).success(function(data){
            $scope.submit();
          }).error(function(data){
            $scope.errorModalMsg = $scope.catDeleteServerErr;
            $scope.pwdInput = '';
          });
          }).error(function(){
            $scope.pwdPlaceHolder = $scope.pwdInputErr;
            $scope.pwdInput = '';
          });
       };
    }]);

    app.controller('quizzescategoriesTabCtrl',['$http','$scope','categoriesQuery','quizCount',
      'addParCatTitle','doCatHaveSubCat','getSubCats','getParCats','$location','$modal',
      'getAccess','addDefaultOption','setCurCatEditDlg',
      function($http,$scope,categoriesQuery,quizCount,addParCatTitle,
      doCatHaveSubCat,getSubCats,getParCats,$location,$modal,getAccess,addDefaultOption,
      setCurCatEditDlg){
      $scope.url = $location.path(); // Initialize  Tab 
      $scope.allCategories = {};
      $scope.catToEditDelete = {};
      $scope.subParCatSelect = {};
      $scope.parCatGrouped = {};
      $scope.subCategories = [];
      $scope.pwdPlaceHolder = 'Введіть пароль...'
      $scope.errorModalMsg = '';
      $scope.pwdInput='';
      $scope.dropdownSubCats = true;
      $scope.lockSelSubCatEdit = false;
      $scope.catExistErr = 'Така категорія вже існує';
      $scope.catEditServerErr = 'Помилка при редагуванні';
      $scope.catHaveSubCatMsg = 'Увага, категорія містить підкатегорії';
      $scope.catDeleteServerErr = 'Помилка при видаленні';
      $scope.pwdInputErr = 'Невірний пароль';
      $scope.catDelRelationalDataMsg = 'Увага, будуть видалені підкатегорії та інші пов\'язані дані';
      
      if(getAccess($scope.url,'admin')){
        updateCatPage();
      } else {
        $location.path( "/404" );
      };      

      $scope.showCreateCatDlg = function(){
        clearForm();

        var modalCreateCat = $modal.open({
          templateUrl: 'modules/administration_panel/modalCreateCat.html',
          controller: 'modalEditDelCreateCatCtrl',
          windowClass: 'category-edit-modal',
          scope: $scope
        });
        modalCreateCat.result.then(function() {
          updateCatPage();
        });
      };
      
      $scope.showDeleteCatDlg = function(category){
        clearForm();
        jQuery.extend($scope.catToEditDelete,category); //we do not need two way data binding here
        $scope.subParCatSelect = setCurCatEditDlg($scope.catToEditDelete, $scope.parCatGrouped);
        showHideAlertMsgButtons(category, $scope.catDelRelationalDataMsg, false);

        var modalDelCat = $modal.open({
          templateUrl: 'modules/administration_panel/modalDeleteCat.html',
          controller: 'modalEditDelCreateCatCtrl',
          windowClass: 'category-edit-modal',
          scope: $scope
        });
        modalDelCat.result.then(function() {
          updateCatPage();
        });
      };
      
      $scope.showEditCatDlg = function(category){
        clearForm();
        jQuery.extend($scope.catToEditDelete,category); //we do not need two way data binding here
        $scope.subParCatSelect = setCurCatEditDlg($scope.catToEditDelete, $scope.parCatGrouped);
        showHideAlertMsgButtons(category, $scope.catHaveSubCatMsg, true);

        var modalEditCat = $modal.open({
          templateUrl: 'modules/administration_panel/modalEditCat.html',
          controller: 'modalEditDelCreateCatCtrl',
          windowClass: 'category-edit-modal',
          scope: $scope
        });
        modalEditCat.result.then(function() {
          updateCatPage();
        });
      };

      function clearForm(){
        $scope.subParCatSelect = $scope.parCatGrouped[$scope.parCatGrouped.length-1];
        $scope.subCategories = [];
        $scope.errorModalMsg = '';
      };
      
      function updateCatPage(){
        categoriesQuery.getAllCategories().success(function(data){
          var subCats;

          $scope.parCatGrouped = getParCats(data);
          subCats = getSubCats(data);
          $scope.subParCatSelect = addDefaultOption($scope.parCatGrouped, $scope.subParCatSelect);
          $scope.allCategories = addParCatTitle(data);
          $scope.groupedQuizzes = quizCount(subCats);
          clearForm();
        });
      };

      function showHideAlertMsgButtons(category, alertMsg, parCatSelLock) {
        var result = doCatHaveSubCat(category, $scope.allCategories, $scope.subCategories)
        if(result.haveCats){
          $scope.subCategories = result.subCatsList;
          //show hidden button and alert message,lock select parCat;
          $scope.errorModalMsg = alertMsg;
          $scope.dropdownSubCats = true;
          if(parCatSelLock) {
            $scope.lockSelSubCatEdit = true;
          };
        } else {
          //hidde button and alert message;
          $scope.errorModalMsg = '';
          $scope.dropdownSubCats = false;
          $scope.lockSelSubCatEdit = false;
        };
      };
    }]);
})();
