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

	{name : 	'admin4',
	 temp : 	'.modules/admin/admin-4.html',
     caption: 	'Admin Tab Mumber Four'
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
	}

	// ,{name : 	'comm1',
	//  temp : 	'.modules/admin/comm-1.html',
 // 	 caption: 	'ANYTHING CAN BE HERE'
	// },

	// {name : 	'comm2',
	//  temp : 	'.modules/admin/comm-2.html',
	//  caption: 	'SOMETHING ELSE IS HERE'
	// },

	// {name : 	'comm3',
	//  temp : 	'.modules/admin/comm-3.html',
	//  caption: 	'EXTREMELY DIFFERENT LAYS HERE'
	// }
])

.factory('getTabTemplates', ["$location", "$http", 'tabs', function($location, $http, tabs) {
    
	return {
	    permission: function() {
	    	var result = [];
			$http.get("http://localhost:9292/admin")
			.success(function(data){
				var givenTabs = tabs;
				var userAccess = data;
				var i=0;
				var j=0;
				var tlen = givenTabs.length;
				var alen = userAccess.length;
				for (j; j < alen; j++) {
					for (i; i < tlen; i++) {
						if(givenTabs[i].name == userAccess[j]){
							result.push([givenTabs[i].name, givenTabs[i].temp, givenTabs[i].caption]);
						}			
					};
					i = 0;
				};
			alert('this is success: ' + result);	
			})

			.error(function(data){
				alert('data is lost');
			})
			alert("this is factory: " + result);	
			return result;
		}
	}
 
    // if (result.length == 0)
	// $location.path( "/404" );
	// alert("this is result: " + result);
}])

.controller("AdminCtrl", ["$location", "$scope", "$http", 'getTabTemplates', function($location, $scope, $http, getTabTemplates){
	var asd = getTabTemplates.permission();
	alert("this is asd: " + asd);
	// if (asd.length > 0)
	if (asd.length > 0)
		$scope.results = getTabTemplates.permission();
	else
		$location.path( "/404" );
}
])