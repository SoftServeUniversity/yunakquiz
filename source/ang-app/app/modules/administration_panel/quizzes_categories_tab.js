(function () {
  var  app = angular.module('yunakQuiz.quizzescategoriesTab' , [
    'ngRoute', 
    'yunakQuiz.categoriesContainer',
    'yunakQuiz.permission',
    'yunakQuiz.quizzescategoriesTabFactories'
  ]);

    app.config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.
          when('/administration-panel/quizzescategoriesTab', {
            templateUrl: './modules/administration_panel/quizzes_categories_tab.html',
            controller: 'quizzescategoriesTabCtrl'
          })
      }
    ]);

    app.controller("modalEditDelCreateCatCtrl", [
      '$modalInstance',
      '$scope',
      '$http',
      'categoryEdit',
      'pwdCheck',
        function ($modalInstance, $scope, $http, categoryEdit, pwdCheck) {
          $scope.currentCategory = {};

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

          $scope.submit = function () {
            $modalInstance.close();
          };

          $scope.updateCategory = function () {
            var request = {
                id: $scope.catToEditDelete.id,
                category_id: $scope.subParCatSelect.id,
                title: $scope.catToEditDelete.title
            };
            pwdCheck($scope.pwdInput).success(function () {
              categoryEdit.update(request).success(function () {
                $scope.submit();
              }).error(function (msg) {
                $scope.errorModalMsg = $scope.serverError + msg.error;
                $scope.pwdInput = '';
              });
            }).error(function (msg) {
              $scope.pwdPlaceHolder = msg;
              $scope.pwdInput = '';
            });
          };

          $scope.createCategory = function () {
            var request = {
                id: $scope.subParCatSelect.id,
                title: $scope.currentCategory.title
            };

            pwdCheck($scope.pwdInput).success(function () {
              categoryEdit.create(request).success(function () {
                $scope.submit();
              }).error(function (msg) {
                $scope.errorModalMsg = $scope.serverError + msg.error;
                $scope.pwdInput = '';
              });
            }).error(function (msg) {
              $scope.pwdPlaceHolder = msg;
              $scope.pwdInput = '';
            });
          };

          $scope.deleteCategory = function () {
            var request = $scope.catToEditDelete.id;

            pwdCheck($scope.pwdInput).success(function () {
              categoryEdit.delCat(request).success(function () {
                $scope.submit();
              }).error(function (msg) {
                $scope.errorModalMsg = $scope.serverError + msg.error;
                $scope.pwdInput = '';
              });
            }).error(function (msg) {
              $scope.pwdPlaceHolder = msg;
              $scope.pwdInput = '';
            });
          };
    }]);

    app.controller('quizzescategoriesTabCtrl', [
      '$http',
      '$scope',
      'categoriesQuery',
      'quizCount',
      'addParCatTitle',
      'doCatHaveSubCat',
      'getSubCatsList',
      'getParCatsList',
      '$location',
      '$modal',
      'getAccess',
      'addSelectorForParCat',
      'setCurCatEditDlg',
      'modalDlg',
        function ($http, $scope, categoriesQuery, quizCount, addParCatTitle,
          doCatHaveSubCat, getSubCatsList, getParCatsList, $location, $modal, getAccess,
          addSelectorForParCat, setCurCatEditDlg, modalDlg) {

          $scope.url = $location.path(); // Initialize  Tab 
          $scope.allCategories = {};
          $scope.catToEditDelete = {};
          $scope.subParCatSelect = {};
          $scope.parCatGrouped = {};
          $scope.subCategories = [];
          $scope.showDropdownSubCats = true;
          $scope.lockSubcatSelect = false;
          $scope.lockDeleteBtn = false;
          $scope.errorModalMsg = '';
          $scope.pwdInput='';
          $scope.pwdPlaceHolder = 'Введіть пароль...'
          $scope.serverError = 'Помилка сервера: ';
          $scope.catHaveSubCatMsg = 'Увага, категорія містить підкатегорії';
          $scope.catDelRelationalDataMsg = 'Увага, будуть видалені підкатегорії';
          $scope.catDelQuizzesMsg = 'Увага підкатегорії містять тести, видалення не можливе';
//Getting permission for page load 
          getAccess($scope.url,'admin').then(function () {
            updateCatPage();
          },function () {
            $location.path( "/404" );
          });

          $scope.modalCreateCat = function () {
            clearData();

            var modalCreateCat = modalDlg('createCat', $scope);

              modalCreateCat.result.then(function () {
                updateCatPage();
              });
          };

          $scope.modalDeleteCat = function (category) {
            clearData();
            jQuery.extend($scope.catToEditDelete, category); //we do not need two way data binding here
            $scope.subParCatSelect = setCurCatEditDlg($scope.catToEditDelete, $scope.parCatGrouped);
            showHideAlertMsgModalElem(category, $scope.catDelRelationalDataMsg, false);

            var modalDelCat = modalDlg('deleteCat', $scope);

            modalDelCat.opened.then(function () {
              if($scope.groupedQuizzes[$scope.catToEditDelete.id]) {
                $scope.errorModalMsg = $scope.catDelQuizzesMsg;
                $scope.lockDeleteBtn = true;
              } else {
                $scope.lockDeleteBtn = false;
              };
            });
            modalDelCat.result.then(function () {
              updateCatPage();
            });
          };
          
          $scope.modalEditCat = function (category) {
            clearData();
            jQuery.extend($scope.catToEditDelete, category); //we do not need two way data binding here
            $scope.subParCatSelect = setCurCatEditDlg($scope.catToEditDelete, $scope.parCatGrouped);
            showHideAlertMsgModalElem(category, $scope.catHaveSubCatMsg, true);

            var modalEditCat = modalDlg('editCat', $scope);

              modalEditCat.result.then(function () {
                updateCatPage();
              });
          };

          function clearData () {
            $scope.subParCatSelect = $scope.parCatGrouped[$scope.parCatGrouped.length-1];
            $scope.subCategories = [];
            $scope.errorModalMsg = '';
          };
          
          function updateCatPage () {
            categoriesQuery.getAllCategories().success(function (data) {
              var subCats;

              $scope.parCatGrouped = getParCatsList(data);
              subCats = getSubCatsList(data);
              $scope.subParCatSelect = addSelectorForParCat($scope.parCatGrouped, $scope.subParCatSelect);
              $scope.allCategories = addParCatTitle(data);
              $scope.groupedQuizzes = quizCount(subCats);
              clearData();
            });
          };

          function showHideAlertMsgModalElem (category, alertMsg, catsSelLock) {
            var result = doCatHaveSubCat(category, $scope.allCategories, $scope.subCategories)
            if(result.haveCats) {
              $scope.subCategories = result.subCatsList;
              //show hidden button and alert message,lock select parCat;
              $scope.errorModalMsg = alertMsg;
              $scope.showDropdownSubCats = true;
              if(catsSelLock) {
                $scope.lockSubcatSelect = true;
              };
            } else {
              //hidde button and alert message;
              $scope.errorModalMsg = '';
              $scope.showDropdownSubCats = false;
              $scope.lockSubcatSelect = false;
            };
          };
      }]);
})();
