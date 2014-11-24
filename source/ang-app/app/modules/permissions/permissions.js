'use strict';

angular.module('yunakQuiz.permission', ['ngRoute'])

.constant('tabs', {
  admin: 
  [
    {'name' : 'admin1',
     'temp' : '/administration-panel/',
     'caption': 'Користувачі' 
    },

    {'name' : 'admin2',
     'temp' : '/administration-panel/blacklistTab',
     'caption': 'Чорний список'
    },

    {'name' : 'admin3',
     'temp' : '/administration-panel/administrationTab',
     'caption': 'Адміністрація'
    },

    {'name' : 'admin4',
     'temp' : '/administration-panel/moderatorsTab',
     'caption': 'Модератори'
    },

    {'name' : 'admin5',
     'temp' : '/administration-panel/quizzescategoriesTab',
     'caption': 'Категорії тестів'
    },

    {'name' : 'admin6',
     'temp' : '/administration-panel/aboutusTab',
     'caption': 'Про нас'
    },

    {'name' : 'admin7',
     'temp' : '/administration-panel/faqTab',
     'caption': 'Часті запитання'
    }
  ],  
  moder:
  [
    {'name' : 'moder1',
     'temp' : '/admin/personalCabinet',
     'caption': 'Кабінет Модератора' 
    }
  ],
  menuAcces: 
  [
    {'name' : 'menu1',
     'temp' : '/admin/personalCabinet/profile',
     'caption': 'Особистий кабінет' 
    },

    {'name' : 'menu2',
     'temp' : '/administration-panel/userTab',
     'caption': 'Панель Адміністратора' 
    },

    {'name' : 'menu3',
     'temp' : '/admin/personalCabinet',
     'caption': 'Кабінет Модератора' 
    }        
  ]  
})

.factory('getTabTemplates', [
  "$location",
  "$http",
  "tabs",
  "$q",
  'CONFIG',
  function($location, $http, tabs, $q, CONFIG) {
    var tabsByRoles = {};
  
    return {
      getResponse: function(){
      
        var defer = $q.defer();

        $http.get(CONFIG.BASE_URL + '/permission').success(function (data) {
          var userAccess = data;
          tabsByRoles = {};
// helper function to sort tabs by roles
          function sortTabsByRoles(givenTabs, role) {
            angular.forEach(userAccess, function (uAccess) {
              angular.forEach(givenTabs, function (givenTab) {
                if(givenTab.name == uAccess) {
                  tabsByRoles[role].push(givenTab);
                }
              });            
            });
          }
// sort tabs by all roles which stored in constant , roles will be key wor array of tabs
          function initRolesTabs(rolesToInit) {
            for(var role in rolesToInit) {
              tabsByRoles[role] = [];
              sortTabsByRoles(tabs[role], role);
            }
          };
          initRolesTabs(tabs);
          defer.resolve(true);
          })
          .error(function(data) {
            tabsByRoles = {};
            defer.reject(data);
          });
      return defer.promise;     
      },
      getTabs: function (role) {
        if (tabsByRoles[role]) {
          return tabsByRoles[role];
        };
        return false;
      }
    }
}])
.factory('getAccess', [
  "$location",
  "$http",
  'getTabTemplates',
  function ($location, $http, getTabTemplates) {
    return function (curUrl, role) {
      var access = {};
      var tabs;

      tabs = getTabTemplates.getTabs(role);
      if (!tabs) {
        return false;
      }; 
      angular.forEach(tabs, function (tab) {
        access[tab.temp] = tab;
      });
      if (!access[curUrl]) {
        return false;
      } 
      return true;
  };
}])
.run(function (getTabTemplates) {//get access tabs on page load for logged in user or guest
  getTabTemplates.getResponse().then(function(){});
});
