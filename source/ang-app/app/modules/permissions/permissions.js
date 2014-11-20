'use strict';

angular.module('yunakQuiz.permission', ['ngRoute'])

.constant('tabs', {
  getAdmin: 
  [
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
     'temp' : 'administration-panel/quizzescategoriesTab',
     'caption': 'Категорії тестів'
    },

    {'name' : 'admin5',
     'temp' : 'administration-panel/aboutusTab',
     'caption': 'Про нас'
    },

    {'name' : 'admin6',
     'temp' : 'administration-panel/faqTab',
     'caption': 'Часті запитання'
    }
  ],  
  getModer:
  [
    {'name' : 'moder1',
     'temp' : 'administration-panel/userTab',
     'caption': 'Користувачі' 
    },

    {'name' : 'moder2',
     'temp' : 'administration-panel/blacklistTab',
     'caption': 'Чорний список'
    },

    {'name' : 'moder3',
     'temp' : 'administration-panel/administrationTab',
     'caption': 'Адміністрація'
    },

    {'name' : 'moder4',
     'temp' : 'administration-panel/quizzescategoriesTab',
     'caption': 'Категорії тестів'
    },

    {'name' : 'moder5',
     'temp' : 'administration-panel/aboutusTab',
     'caption': 'Про нас'
    },

    {'name' : 'moder6',
     'temp' : 'administration-panel/faqTab',
     'caption': 'Часті запитання'
    }
  ],
  getSuper: 
  [
    {'name' : 'all',
     'temp' : 'administration-panel/userTab',
     'caption': 'ALL' 
    }
  ]  
})

.factory('getTabTemplates', ["$location", "$http", "tabs", "$q", function($location, $http, tabs, $q) {
  return {
    getResponse: function(getRole){
      
      var defer = $q.defer();
      var result = [];

      $http.get("http://localhost:9292/permission")
        .success(function(data){
          // var givenTabs = tabs.getAdmin;
          // var givenTabs = commands;
          
          var givenTabs;

          alert("getRole: " + getRole);
          alert("tabs: " + tabs.getAdmin);
          if (getRole == 'admin'){
            alert("1");
            givenTabs = tabs.getAdmin;
          }
          else {
            givenTabs = tabs.getModer; 
            alert("2");
          }
          alert("givenTabs: " + givenTabs);

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
    
    getTabTemplates.getResponse('admin').then(function(data){
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
