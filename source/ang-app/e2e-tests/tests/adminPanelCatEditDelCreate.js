'use strict';
describe('AdminPanel', function () {

  var ptor =  protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  var parCategories = 
    [
      {catName: 'Спорт', testcount: 8, parentCategory: '---', subcatQuantity: 3, catId: 1},
      {catName:'Футбол', testcount: 1, parentCategory: 'Спорт', subcatQuantity: 0, catId: 2},
      {catName: 'Комп\'ютери', testcount: 4, parentCategory: '---', subcatQuantity: 3, catId: 3},
      {catName: 'Туризм', testcount: 1, parentCategory: '---', subcatQuantity: 3, catId: 4},
      {catName:'Країни', testcount: 1, parentCategory: 'Туризм', subcatQuantity: 0, catId: 5},
      {catName:'Хокей', testcount: 7, parentCategory: 'Спорт', subcatQuantity: 0, catId: 6},
      {catName:'Баскетбол', testcount: '', parentCategory: 'Спорт', subcatQuantity: 0, catId: 7},
      {catName:'Комплектуючі', testcount: 1, parentCategory: 'Комп\'ютери', subcatQuantity: 0, catId: 8},
      {catName:'Програмування', testcount: 1, parentCategory: 'Комп\'ютери', subcatQuantity: 0, catId: 9},
      {catName:'Мережі', testcount: 2, parentCategory: 'Комп\'ютери', subcatQuantity: 0, catId: 10},
      {catName:'Столиці', testcount: '', parentCategory: 'Туризм', subcatQuantity: 0, catId: 11},
      {catName:'Гори', testcount: '', parentCategory: 'Туризм', subcatQuantity: 0, catId: 12}
    ];
  var parCatRowSel = 
    {catName: 'category.title',
     parentCategory: 'category.parCatTitle',
     testcount: 'groupedQuizzes[category.id]'
    };

  var title = 
    [{catTitleElemName: '№', cssSel: 'catTitleId'},
     {catTitleElemName: 'Назва Категорії', cssSel: 'catTitleName'},
     {catTitleElemName: 'Батьківська категорія', cssSel: 'catTitleParentName'},
     {catTitleElemName: 'Кількість тестів', cssSel: 'quizTitleCount'},
     {catTitleElemName: 'Додати', cssSel: 'admin-pan-category-add-btn'}
    ];
  var butn = 
    {btnEdit: {btnClass: 'btn-success', btnName: 'Редагувати'},
     btnDelete: {btnClass: 'btn-danger', btnName: 'Видалити'}
    };
  var btnModal = 
    {addCat: {btnName: 'Додати категорію'},
     cancel: {btnName: 'Скасувати'},
     edit: {btnName: 'Редагувати категорію'}
    };

  var modalCreateWindow = 
    [{elemSelector: 'modTitle', text: 'Створення Категорії'},
     {elemSelector: 'catName', text: 'Назва категорії'},
     {elemSelector: 'parCatName', text: 'Батьківська категорія'},
     {elemSelector: 'pwdInputLbl', text: 'Пароль'},
     {elemSelector: 'btnCancel', text: 'Скасувати'},
     {elemSelector: 'btnSubmit', text: 'Додати категорію'},
     {elemSelector: 'close', text: ''}
    ];
  var modalEditParCatHaveSubcat = 
    [{elemSelector: 'modTitle', text: 'Редагувати категорію'},
     {elemSelector: 'catName', text: 'Назва категорії'},
     {elemSelector: 'parCatName', text: 'Батьківська категорія'},
     {elemSelector: 'pwdInputLbl', text: 'Пароль'},
     {elemSelector: 'btnCancel', text: 'Скасувати'},
     {elemSelector: 'btnSubmit', text: 'Застосувати'},
     {elemSelector: 'close', text: ''},
     {elemSelector: 'dropdown-toggle', text: 'Підкатегорії'}
    ];    
  var modalCreateWindowInputs = 
    [{modelSelector: 'currentCategory.title', inputModelText: ''},
     {modelSelector: 'pwdInput', inputModelText: ''},
     {modelSelector: 'subParCatSelect', inputModelText: '3'}
    ];
  var modalEditWindowInputs = 
    [{modelSelector: 'catToEditDelete.title', inputModelText: 'Спорт'},
     {modelSelector: 'pwdInput', inputModelText: ''},
     {modelSelector: 'subParCatSelect', inputModelText: '3'}
    ];
  var testCatName = "NewCategory";
  var testPwdIncorrect = '1234567';
  var parCatSelectors = {parCat: 'select option:nth-child(1)'};
  var startUrl = 'http://localhost:8000/#/administration-panel/quizzescategoriesTab';
  
  function adminPanCatEditDelCreateUrl() {
    browser.get(startUrl);
  };

  function checkTitleElem() {
    var currentElem;

    title.forEach(function (titleElem) {
      currentElem = element(by.className(titleElem.cssSel)).getText();
      expect(currentElem).toMatch(titleElem.catTitleElemName);
    });
  };

  function checkCatListBy(searchBy,colName){
    var currentElem;

    parCategories.forEach(function (rowElem, index) {
      currentElem =  element.all(by.binding(searchBy)).get(index).getText();
      expect(currentElem).toMatch(rowElem[colName]);
    })
  };

  function checkButtonPresenceEditDelete(btnName) {
    var currentElem;
    var currentRow;

    parCategories.forEach(function (rowElem, index) {
      currentRow =  element.all(by.repeater('category in allCategories')).get(index);
      currentElem = currentRow.all(by.className(butn[btnName].btnClass)).getText();
      expect(currentElem).toMatch(butn[btnName].btnName);
    })
  };

  function buttonEditDelClickCheck(btnName) {
    var currentElem;
    var currentRow;
    var modalTitle;

    parCategories.forEach(function (rowElem, index) {
      currentRow =  element.all(by.repeater('category in allCategories')).get(index);
      currentElem = currentRow.all(by.className(butn[btnName].btnClass)).click();
      modalTitle = element(by.className('modTitle')).getText();
      expect(modalTitle).toMatch(btnModal.edit.btnName);
      element(by.buttonText(btnModal.cancel.btnName)).click();
    })
  };

  beforeEach(function () {
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    adminPanCatEditDelCreateUrl(); 
  });

  describe('Admin panel Category Create/Edit/Delete/View', function () {
    
    it('All elements in panel title should be and corectly named', function () {
      checkTitleElem();
    });

    it('All category Names in panel should be corect', function () {
      checkCatListBy(parCatRowSel.catName,'catName');
    });
    it('All category parent category column in panel should be corect', function () {
      checkCatListBy(parCatRowSel.parentCategory,'parentCategory');
    });
    it('All category quizzes count in panel should be corect', function () {
      checkCatListBy(parCatRowSel.testcount,'testcount');
    });
    it('All category buttons in panel should have corect names', function () {
      checkButtonPresenceEditDelete('btnEdit');
    });
    it('All category quizzes count in panel should be corect', function () {
      checkButtonPresenceEditDelete('btnDelete');
    });
    it('All category quizzes count in panel should be corect', function () {
      buttonEditDelClickCheck('btnEdit');
    });
  });
  describe('Admin panel modal window Create', function () {
    function modalCreateTextElemAndBtnCheck() {
      var currentElem;

      element(by.className('admin-pan-category-add-btn')).click();
      modalCreateWindow.forEach(function (textElem) {
        currentElem = element.all(by.className(textElem.elemSelector)).getText();
        expect(currentElem).toMatch(textElem.text);
      });
    };

    function modalEditParCatWithSubCatTextElemAndBtnCheck() {
      var currentElem;
      var currentRow;
      var modalTitle;

      currentRow =  element.all(by.repeater('category in allCategories')).first();
      currentElem = currentRow.all(by.className(butn.btnEdit.btnClass)).click();

      modalEditParCatHaveSubcat.forEach(function (textElem) {
        currentElem = element.all(by.className(textElem.elemSelector)).getText();
        expect(currentElem).toMatch(textElem.text);
      });

    };

    function modalCreateInputsCheck() {
      var currentElem;

      element(by.className('admin-pan-category-add-btn')).click();
      modalCreateWindowInputs.forEach(function (input) {
        currentElem = element(by.model(input.modelSelector)).getAttribute('value');
        expect(currentElem).toMatch(input.inputModelText);
      });
    };

    function modalCreateOnIncorrectPwdCheck() {
      var categoryInput,
          passwordInput;

      element(by.className('admin-pan-category-add-btn')).click();
        categoryInput = element(by.model(modalCreateWindowInputs[0].modelSelector));
        passwordInput = element(by.model(modalCreateWindowInputs[1].modelSelector));
        categoryInput.sendKeys(testCatName);
        element(by.css(parCatSelectors.parCat)).click();
        passwordInput.sendKeys(testPwdIncorrect);
        element(by.buttonText(btnModal.addCat.btnName)).click();
        expect(passwordInput.getText()).toMatch('');
        element(by.buttonText(btnModal.cancel.btnName)).click();
    };

    it('All elements except inputs should have correct name', function () {
      modalCreateTextElemAndBtnCheck();
    });
    it('All Inputs elements should be declared', function() {
      modalCreateInputsCheck();
    });
    it('All fields should be entered correct ,password incorrect', function () {
      modalCreateOnIncorrectPwdCheck();
    });
  });
describe('Admin panel modal window Edit', function () {

    function modalEditParCatWithSubCatTextElemAndBtnCheck() {
      var currentElem;
      var currentRow;
      var modalTitle;

      currentRow =  element.all(by.repeater('category in allCategories')).first();
      currentElem = currentRow.all(by.className(butn.btnEdit.btnClass)).click();

      modalEditParCatHaveSubcat.forEach(function (textElem) {
        currentElem = element.all(by.className(textElem.elemSelector)).getText();
        expect(currentElem).toMatch(textElem.text);
      });
      element(by.buttonText(btnModal.cancel.btnName)).click();
    };
    function modalEditInputsCheck() {
      var currentElem;
      var currentRow ;

      currentRow =  element.all(by.repeater('category in allCategories')).first();
      currentElem = currentRow.all(by.className(butn.btnEdit.btnClass)).click();
      modalEditWindowInputs.forEach(function (input) {
        currentElem = element(by.model(input.modelSelector)).getAttribute('value');
        expect(currentElem).toMatch(input.inputModelText);
      });
      currentElem = element(by.binding('errorModalMsg')).getText();
      expect(currentElem).toMatch('Увага, категорія містить підкатегорії');
      currentElem = element(by.model('subParCatSelect')).isEnabled();
      expect(currentElem).toBe(false);
    };

    it('All fields should be entered correct ', function () {
      modalEditParCatWithSubCatTextElemAndBtnCheck();
    });
    it('All Inputs elements should be declared ', function () {
      modalEditInputsCheck();
    });
  });
});
