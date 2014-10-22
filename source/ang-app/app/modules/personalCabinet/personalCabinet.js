'use strict';

angular.module('yunakQuiz.personalCabinet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  			.when('/personal_cabinet/published', {
	    		templateUrl: 'modules/personalCabinet/published.html',
	    		controller: 'PublishedCtrl'
  			})
  			.when('/personal_cabinet/unfinished', {
	    		templateUrl: 'modules/personalCabinet/unfinished.html',
	    		controller: 'UnfinishedCtrl'
  			})
  			.when('/personal_cabinet/unapproved', {
	    		templateUrl: 'modules/personalCabinet/unapproved.html',
	    		controller: 'UnapprovedCtrl'
  			})
  			.when('/personal_cabinet/created', {
	    		templateUrl: 'modules/personalCabinet/created.html',
	    		controller: 'CreatedCtrl'
  			})
  			.when('/personal_cabinet/profile', {
	    		templateUrl: 'modules/personalCabinet/profile.html',
	    		controller: 'ProfileCtrl'
  			});
}])

.controller('PublishedCtrl', [function() {

}])
.controller('UnfinishedCtrl', [function() {

}])
.controller('UnapprovedCtrl', [function() {

}])

.controller('CreatedCtrl', [function() {

}])

.controller('ProfileCtrl', [function() {

}]);


