'use strict';

angular.module('yunakQuiz.admin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'modules/admin/admin.html',
    controller: 'AdminCtrl',
    controllerAs: "admin"
  });
}])

.constant('tabs', [
	{name : 	'admin1',
	 temp : 	'.modules/admin/admin-1.html',
	 caption: 	'Admin Tab N1' 
	},

	{name : 	'admin2',
	 temp : 	'.modules/admin/admin-2.html',
	 caption: 	'Admin Tab No 2'
	},

	{name : 	'admin3',
	 temp : 	'.modules/admin/admin-3.html',
     caption: 	'Admin Tab # 3'
	},

	{name : 	'moder1',
	 temp : 	'.modules/admin/moder-1.html',
     caption: 	'Moderator Tab Number One'
	},

	{name : 	'moder2',
	 temp : 	'.modules/admin/moder-2.html',
     caption: 	'Moder Tab n 2'
	},

	{name : 	'moder3',
	 temp : 	'.modules/admin/moder-3.html',
 	 caption: 	'Moder Tab nO 3'
	},

	{name : 	'comm1',
	 temp : 	'.modules/admin/comm-1.html',
 	 caption: 	'ANYTHING CAN BE HERE'
	},

	{name : 	'comm2',
	 temp : 	'.modules/admin/comm-2.html',
	 caption: 	'SOMETHING ELSE IS HERE'
	}
])

.factory('AccessTabs', ["$location", "$http", 'tabs', function($location, $http, tabs) {
    
	return{
		get: function(){
			// return $http.get("http://localhost:9292/admin",{ withCredentials: true})		
			return $http.get("http://localhost:9292/admin")
		}
	}

}])

.controller("AdminCtrl", ["$location", "$scope", "$http", 'tabs', 'AccessTabs', function($location, $scope, $http, tabs, AccessTabs){
	
	AccessTabs.get()
		.success(function(data){
			var result = [];
			$scope.got = data;
			var givenTabs = tabs;
			var userAccess = data;
			var i=0;
			var j=0;
			var tlen = givenTabs.length;
			var alen = userAccess.length;
			for (j; j < alen; j++) {
				for (i; i < tlen; i++) {
  					if(givenTabs[i].name == userAccess[j].tabs){
  						result.push(givenTabs[i].temp);
  					}			
  				};
  				i = 0;
  			};
  			$scope.results = result;
  		})
		.error(function(data){
			alert('data is lost');
		})
}
])