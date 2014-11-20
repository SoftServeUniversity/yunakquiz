'use strict';

angular.module('yunakQuiz.permission', ['ngRoute'])

.constant('tabs', [
  {'name' : 'admin1',
   'temp' : 'administration-panel/userTab',
   'caption': 'Користувачі' 
  },

  {'name' : 'admin2',
   'temp' : 'administration-panel/blacklistTab',
   'caption': 'Чорний список'
  },

  {'name' : 'admin3',
   'temp' : 'administration-panel/administrationTab',
   'caption': 'Адміністрація'
  },

  {'name' : 'admin4',
   'temp' : 'administration-panel/moderatorsTab',
   'caption': 'Модератори'
  },
  {'name' : 'admin5',
   'temp' : 'administration-panel/quizzescategoriesTab',
   'caption': 'Категорії тестів'
  },
  {'name' : 'admin6',
   'temp' : 'administration-panel/aboutusTab',
   'caption': 'Про нас'
  },

  {'name' : 'admin7',
   'temp' : 'administration-panel/faqTab',
   'caption': 'Часті запитання'
  },
  
])

.factory('getTabTemplates', ["$location", "$http", "tabs", "$q", function($location, $http, tabs, $q) {
  return {
    getResponse: function(){
      var defer = $q.defer();
      var result = [];

      $http.get("http://localhost:9292/permission")
        .success(function(data){
          var givenTabs = tabs;
          var userAccess = data;
          var i=0;
          var j=0;
          var tlen = givenTabs.length;
          var alen = userAccess.length;
  
          for (j; j < alen; j++) {
            for (i; i < tlen; i++) {
              if(givenTabs[i].name === userAccess[j]) {
                result.push(givenTabs[i]);
              }     
            };
            i = 0;
          };
            defer.resolve(result);
          }).error(function(data){
            result = data;
            defer.reject(result);
          });
      return defer.promise;     
    }
  }
}])
.factory('getAccess', ["$location", "$http", "tabs", "$q", 'getTabTemplates', function($location, $http, tabs, $q, getTabTemplates) {
  return function(curTab){
    var defer = $q.defer();
    var access = {};

    getTabTemplates.getResponse().then(function(data){
      angular.forEach(data, function(tab,key){
        access[tab.caption] = tab;
      });
      if(access[curTab]){
        defer.resolve(true);
      } else
        defer.resolve(false);
      },function(reason) {
        defer.reject(false);
      });
    return defer.promise;     
  }
}])
