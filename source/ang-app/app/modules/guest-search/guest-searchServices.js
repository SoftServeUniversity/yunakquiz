'use strict';

(function (){
	guestSearch.factory('guestSearchFactory', ['$http', function($http){

		return {
			getAllCats: function () {
				return $http.get('http://localhost:9292/guest-search');
			}
		};

	}]);
})();
