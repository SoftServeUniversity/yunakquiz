(function(){
  angular.module('yunakQuiz.users')
  .factory("userValidationService", function(){
    function Validation($scope){
      this.$scope = $scope;
      this.error = {};
      this.takenUsers = [];
      this.takenEmails = [];
    }
    
    Validation.prototype.hasErrors = function(fieldname) {
      return  (this.$scope.regform[fieldname].$dirty && this.$scope.regform[fieldname].$invalid) || 
          (this.$scope.regform.submitted && this.$scope.regform[fieldname].$invalid);       
    };
    
    Validation.prototype.usernameError = function(){
      var usernameField = this.$scope.regform.username;
      if (this.hasErrors("username")){
        if (usernameField.$error.required){
          this.error.username = "Будь-ласка, введіть нік";
        } else if (usernameField.$error.minlength){
          this.error.username = "Довжина нікнейма повинна становити принаймі 3 символи";
        }
      } else {
        if (this.takenUsers.indexOf(usernameField.$viewValue) !== -1){
          this.error.username = "Користувач з таким іменем вже існує";
        } else {
          this.error.username = "";
        }
      }
      return this.error.username;
    };
    
    Validation.prototype.addTakenUser = function(username){
      this.takenUsers.push(username);
    };
     
    Validation.prototype.addTakenEmail = function(email){
      this.takenEmails.push(email);
    }; 
    Validation.prototype.passwordError = function() {
      if (this.hasErrors("password")) {
        if (this.$scope.regform.password.$error.required) {
          this.error.password = "Будь-ласка, введіть пароль";
        } else if (this.$scope.regform.password.$error.minlength) {
          this.error.password = "Довжина пароля повинна становити принаймі 8 символів";
        }
      } else {
        this.error.password = "";
      }
      return this.error.password;
    }; 
  
    Validation.prototype.birthdayError = function() {
      if (this.hasErrors("birthday")) {
        if (this.$scope.regform.birthday.$error.required) {
          this.error.birthday = "Будь-ласка, введіть день народження";
        }
      } else {
        this.error.birthday = "";
      }
      return this.error.birthday;
    }; 
    
    Validation.prototype.emailError = function() {
      var emailField = this.$scope.regform.email;  
      if (this.hasErrors("email")) {
        if (this.$scope.regform.email.$error.required) {
          this.error.email = "Будь-ласка, введіть електронну адресу";
        } else if (this.$scope.regform.email.$error.pattern) {
          this.error.email = "Будь-ласка, введіть валідну електронну адресу";
        }
      } else {
        if (this.takenEmails.indexOf(emailField.$viewValue) !== -1){
          this.error.email = "Користувач з такою адресою вже існує";
        } else {
          this.error.email = "";
        }
      }
      return this.error.email;
    }; 

    Validation.prototype.confirmPassError = function() {
      var passwordField = this.$scope.regform.password;
      var confirmationField = this.$scope.regform.password_confirmation;
      if (this.$scope.regform.password_confirmation.$dirty && confirmationField.$viewValue !== passwordField.$viewValue) {
        this.error.password_confirmation = "Підтвердження пароля не співпадає!";
      } else {
        this.error.password_confirmation = "";
      }
      return this.error.password_confirmation;
    };

    return Validation;
  })
  
  .factory('userService', ['$resource',
    function($resource) {
      return $resource('http://localhost:9292/user', null,
        {'update': { method:'PUT' }
      }); 
  }])
  
  .factory('accessService', ['$resource', function($resource) {
      return $resource('http://localhost:9292/access');
    }]);  
  
  
})();  
