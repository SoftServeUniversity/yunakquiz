'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Profile', function() {
   var ptor =  protractor.getInstance();
   var mockModule = require('../mocked-backend.js');
   ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);

   describe('profile page', function(){
   beforeEach(function(){
     browser.get('http://localhost:8000/#/admin/personalCabinet/profile');
   });
 
   it('should see all fields with values, buttons and avatar', function(){
     expect(element(by.xpath("//strong[./text()=\"Ім'я\"]")).getText()).toMatch(/Ім'я/);
     expect(element(by.xpath("//strong[./text()='Прізвище']")).getText()).toMatch(/Прізвище/);
     expect(element(by.xpath("//strong[./text()='Пошта']")).getText()).toMatch(/Пошта/);
     expect(element(by.xpath("//strong[./text()='День народження']")).getText()).toMatch(/День народження/);
     expect(element(by.xpath("//strong[./text()='Пластовий курінь']")).getText()).toMatch(/Пластовий курінь/);
     expect(element(by.xpath("//strong[./text()='Станиця']")).getText()).toMatch(/Станиця/);
     expect(element(by.xpath("//strong[./text()='Пластовий ступінь']")).getText()).toMatch(/Пластовий ступінь/);
     expect(element(by.css('.profile-avatar')).isPresent()).toBe(true);
     expect(element(by.buttonText('Змінити')).isPresent()).toBe(true);
     expect(element(by.buttonText('Редагувати')).isPresent()).toBe(true);
     expect(element(by.buttonText('Видалити')).isPresent()).toBe(true);
   });

   it('should see form with inputs', function(){
     element(by.buttonText('Редагувати')).click();
     expect(element(by.model('profile.user.first_name')).isPresent()).toBe(true);
     expect(element(by.model('profile.user.last_name')).isPresent()).toBe(true);
     expect(element(by.model('profile.user.email')).isPresent()).toBe(true);
     expect(element(by.model('profile.user.birthday')).isPresent()).toBe(true);
     expect(element(by.model('profile.user.plast_hovel')).isPresent()).toBe(true);
     expect(element(by.model('profile.user.plast_region')).isPresent()).toBe(true);
     expect(element(by.model('profile.user.plast_level')).isPresent()).toBe(true);
   });

   it('should see all inputs with existing values', function(){
     var userObject = {};
     userObject.firstName = element(by.binding('profile.user.first_name')).getText(); 
     userObject.lastName = element(by.binding('profile.user.last_name')).getText();
     userObject.email = element(by.binding('profile.user.email')).getText();
     userObject.birthday = element(by.binding('profile.user.birthday')).getText();
     userObject.plastHovel = element(by.binding('profile.user.plast_hovel')).getText();
     userObject.plastRegion = element(by.binding('profile.user.plast_region')).getText();
     userObject.plastLevel = element(by.binding('profile.user.plast_level')).getText();
   
     element(by.buttonText('Редагувати')).click();
     expect(element(by.model('profile.user.first_name')).getAttribute('value')).toEqual(userObject.firstName);
     expect(element(by.model('profile.user.last_name')).getAttribute('value')).toEqual(userObject.lastName);
     expect(element(by.model('profile.user.email')).getAttribute('value')).toEqual(userObject.email);
     expect(element(by.model('profile.user.birthday')).getAttribute('value')).toEqual(userObject.birthday); 
     expect(element(by.model('profile.user.plast_hovel')).getAttribute('value')).toEqual(userObject.plastHovel); 
     expect(element(by.model('profile.user.plast_region')).getAttribute('value')).toEqual(userObject.plastRegion); 
     expect(element(by.model('profile.user.plast_level')).getAttribute('value')).toEqual(userObject.plastLevel); 
   });

   it('click on Edit Button and Cancel Button', function(){
     element(by.buttonText('Редагувати')).click();
     var first = element(by.model('profile.user.first_name')).getAttribute('value');
     var last = element(by.model('profile.user.last_name')).getAttribute('value');
     var email = element(by.model('profile.user.email')).getAttribute('value');
     var birthday = element(by.model('profile.user.birthday')).getAttribute('value'); 
     var hovel = element(by.model('profile.user.plast_hovel')).getAttribute('value'); 
     var region = element(by.model('profile.user.plast_region')).getAttribute('value'); 
     var level = element(by.model('profile.user.plast_level')).getAttribute('value'); 
   
     first.clear().sendKeys('Lina');
     last.clear().sendKeys('Kostenko');
     email.clear().sendKeys('lina.kostenko@gmail.com');
     hovel.clear().sendKeys('somewhere');
     region.clear().sendKeys('Sokal');
     element(by.buttonText('Відмінити')).click();
     expect(element(by.binding('profile.user.first_name')).getText()).toEqual(first); 
     expect(element(by.binding('profile.user.last_name')).getText()).toEqual(last);
     expect(element(by.binding('profile.user.email')).getText()).toEqual(email);
     expect(element(by.binding('profile.user.plast_hovel')).getText()).toEqual(hovel);
     expect(element(by.binding('profile.user.plast_region')).getText()).toEqual(region);
   });

   it('should open modal window', function() {
     element(by.buttonText('Видалити')).click(); 
     browser.sleep(1000);
     expect(element(by.id('deleteProfile')).isDisplayed()).toBe(true);
   });
  
   it('should display error message when we submit empty fields', function() {
     element(by.buttonText('Видалити')).click(); 
     element(by.buttonText('Видалити профайл')).click();
     expect(element(by.css('small')).getText()).toBe("Введіть пароль і/або капчу");
   });
  
  
  it('should display error message when we input invalid captcha', function() {
     element(by.buttonText('Видалити')).click(); 
     element(by.model('model.password')).sendKeys("12345678");
     element(by.model('model.enteredCaptcha')).sendKeys("754");
     element(by.buttonText('Видалити профайл')).click();
     expect(element(by.css('small')).getText()).toBe("Невірно введена капча");
   });
   
  
  
  it('should display error message when we input invalid password', function() {
     element(by.buttonText('Видалити')).click(); 
     var captcha = element(by.binding('model.captcha')).getText(); 
     element(by.model('model.password')).sendKeys("1234567");
     element(by.model('model.enteredCaptcha')).sendKeys(captcha);
     element(by.buttonText('Видалити профайл')).click();
     expect(element(by.css('small')).getText()).toBe("Невірно введений пароль");
   });
  
   it('should delete user', function() {
     element(by.buttonText('Видалити')).click();
     var captcha = element(by.binding('model.captcha')).getText(); 
     element(by.model('model.password')).sendKeys("12345678");
     element(by.model('model.enteredCaptcha')).sendKeys(captcha);
     element(by.buttonText('Видалити профайл')).click();
     expect(browser.getLocationAbsUrl()).toMatch("/");
   });

   it('edit and save buttons', function(){
     element(by.buttonText('Редагувати')).click();
     var first_name = "Lina";
     var last_name = "Kostenko";
     var email = "lina.kostenko@gmail.com";
     var hovel = "some";
     var region = "Odessa"; 
   
     element(by.model('profile.user.first_name')).clear().sendKeys(first_name);
     element(by.model('profile.user.last_name')).clear().sendKeys(last_name);
     element(by.model('profile.user.email')).clear().sendKeys(email);
     element(by.model('profile.user.plast_hovel')).clear().sendKeys(hovel);
     element(by.model('profile.user.plast_region')).clear().sendKeys(region);
     element(by.xpath("//button[contains(@class, 'btn-success') and text()='Зберегти']")).click();
     expect(element(by.binding('profile.user.first_name')).getText()).toEqual(first_name); 
     expect(element(by.binding('profile.user.last_name')).getText()).toEqual(last_name);
     expect(element(by.binding('profile.user.email')).getText()).toEqual(email);
     expect(element(by.binding('profile.user.plast_hovel')).getText()).toEqual(hovel);
     expect(element(by.binding('profile.user.plast_region')).getText()).toEqual(region);
   });

  });
});
