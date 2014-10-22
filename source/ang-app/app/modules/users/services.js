(function(){
  angular.module('yunakQuiz.users')
  .factory("userValidationService", function(){
    function Validation($scope){
      this.$scope = $scope;
      this.error = {};
      this.takenUsers = [];
    }
    
    Validation.prototype.hasErrors = function(fieldname) {
      return  (this.$scope.regform[fieldname].$dirty && this.$scope.regform[fieldname].$invalid) || 
          (this.$scope.regform.submitted && this.$scope.regform[fieldname].$invalid);       
    };
    
    Validation.prototype.usernameError = function(){
      var usernameField = this.$scope.regform.username;
      if (this.hasErrors("username")){
        if (usernameField.$error.required){
          this.error.username = "Please input a username";
        } else if (usernameField.$error.minlength){
          this.error.username = "Your username is required to be at least 3 characters";
        }
      } else {
        if (this.takenUsers.indexOf(usernameField.$viewValue) !== -1){
          this.error.username = "Username has already been taken";
        } else {
          this.error.username = "";
        }
      }
      return this.error.username;
    };
    
    Validation.prototype.addTakenUser = function(username){
      this.takenUsers.push(username);
    };
     
    Validation.prototype.passwordError = function() {
      if (this.hasErrors("password")) {
        if (this.$scope.regform.password.$error.required) {
          this.error.password = "Please input a password";
        } else if (this.$scope.regform.password.$error.minlength) {
          this.error.password = "Your password is required to be at least 8 characters";
        }
      } else {
        this.error.password = "";
      }
      return this.error.password;
    }; 
  
    Validation.prototype.birthdayError = function() {
      if (this.hasErrors("birthday")) {
        if (this.$scope.regform.birthday.$error.required) {
          this.error.birthday = "Please input your birthday";
        }
      } else {
        this.error.birthday = "";
      }
      return this.error.birthday;
    }; 
    
    Validation.prototype.emailError = function() {
      if (this.hasErrors("email")) {
        if (this.$scope.regform.email.$error.required) {
          this.error.email = "Please input your email";
        } else if (this.$scope.regform.email.$error.pattern) {
          this.error.email = "That is not a valid email. Please input a valid email";
        }
      } else {
        this.error.email = "";
      }
      return this.error.email;
    }; 

    Validation.prototype.confirmPassError = function() {
      var passwordField = this.$scope.regform.password;
      var confirmationField = this.$scope.regform.password_confirmation;
      if (this.$scope.regform.password_confirmation.$dirty && confirmationField.$viewValue !== passwordField.$viewValue) {
        this.error.password_confirmation = "Passwords don't match!";
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
  }]);  
})();  
