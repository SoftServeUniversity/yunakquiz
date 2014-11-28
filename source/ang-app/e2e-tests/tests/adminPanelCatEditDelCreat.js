'use strict';
describe('AdminPanel', function(){

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
    {catId: '{{category.id}}',
     catName: '{{category.title}}',
     parentCategory: '{{category.parCatTitle}}',
     testcount: '{{groupedQuizzes[category.id]}}'
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
  var startUrl = 'http://localhost:8000/#/administration-panel/quizzescategoriesTab';
  
  function adminPanCatEditDelCreateUrl(){
    browser.get(startUrl);
  };

  function checkTitleElem(){
    var currentElem;

    title.forEach(function(titleElem){
      currentElem = element(by.className(titleElem.cssSel)).getText();
      expect(currentElem).toMatch(titleElem.catTitleElemName);
    });
  };

  function checkCatListBy(searchBy,colName){
    var currentElem;

    parCategories.forEach(function(rowElem,index){
      currentElem =  element.all(by.binding(searchBy)).get(index).getText();
      expect(currentElem).toMatch(rowElem[colName]);
    })
  };

  function checkButtonPresenceEditDelete(btnName){
    var currentElem;
    var currentRow;

    parCategories.forEach(function(rowElem,index){
      currentRow =  element.all(by.repeater('category in allCategories')).get(index);
      currentElem = currentRow.all(by.className(butn[btnName].btnClass)).getText();
      expect(currentElem).toMatch(butn[btnName].btnName);
    })
  };

  // function buttonEditDelClickCheck(btnName){
  //   var currentElem;
  //   var currentRow;
  //   var modalTitle;

  //   parCategories.forEach(function(rowElem,index){
  //     currentRow =  element.all(by.repeater('category in allCategories')).get(index);
  //     currentElem = currentRow.all(by.className(butn[btnName].btnClass)).click();
  //     browser.waitForAngular();
  //     modalTitle = element(by.className('modEditTitle')).getText();
  //     expect(modalTitle).toMatch('Редагувати категорію');
  //     element(by.buttonText('Скасувати')).click();
  //     //adminPanCatEditDelCreateUrl();
  //   })
  // };

  beforeEach(function() {
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    adminPanCatEditDelCreateUrl(); 
  });

  describe('Admin panel Category Create/Edit/Delete/View', function() {
    
    it('All elements in panel title should be and corectly named', function(){
      checkTitleElem();
    });
    it('All category Id\'s in panel should be corect', function(){
      checkCatListBy(parCatRowSel.catId,'catId');
    });
    it('All category Names in panel should be corect', function(){
      checkCatListBy(parCatRowSel.catName,'catName');
    });
    it('All category parent category column in panel should be corect', function(){
      checkCatListBy(parCatRowSel.parentCategory,'parentCategory');
    });
    it('All category quizzes count in panel should be corect', function(){
      checkCatListBy(parCatRowSel.testcount,'testcount');
    });
    it('All category buttons in panel should have corect names', function(){
      checkButtonPresenceEditDelete('btnEdit');
    });
    it('All category quizzes count in panel should be corect', function(){
      checkButtonPresenceEditDelete('btnDelete');
    });
    // it('All category quizzes count in panel should be corect', function(){
    //   buttonEditDelClickCheck('btnEdit');
    // });

  });
});
