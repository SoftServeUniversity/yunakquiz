'use strict';

angular.module('yunakQuiz.permission', ['ngRoute'])

.constant('tabs', {
  admin: 
  [
    {'name' : 'adminUsersTab',
     'temp' : '/administration-panel/',
     'caption': 'Користувачі' 
    },

    {'name' : 'adminBlackListTab',
     'temp' : '/administration-panel/blacklistTab',
     'caption': 'Чорний список'
    },

    {'name' : 'adminAdministrationTab',
     'temp' : '/administration-panel/administrationTab',
     'caption': 'Адміністрація'
    },

    {'name' : 'adminModeratorsTab',
     'temp' : '/administration-panel/moderatorsTab',
     'caption': 'Модератори'
    },

    {'name' : 'adminCategoriesTab',
     'temp' : '/administration-panel/quizzescategoriesTab',
     'caption': 'Категорії тестів'
    },

    {'name' : 'adminAboutUsTab',
     'temp' : '/administration-panel/aboutusTab',
     'caption': 'Про нас'
    },

    {'name' : 'adminFAQ',
     'temp' : '/administration-panel/faqTab',
     'caption': 'Часті запитання'
    }
  ],  
  moder:
  [
    {'name' : 'Moder_cabinet',
     'temp' : '/admin/moderationCabinet',
     'caption': 'Кабінет Модератора' 
    },
    {'name' : 'Moder_published',
     'temp' : '/admin/moderationCabinet/published',
     'caption': 'Кабінет Модератора' 
    },
    {'name' : 'Moder_review',
     'temp' : '/admin/moderationCabinet/review',
     'caption': 'Кабінет Модератора' 
    },
    {'name' : 'Moder_enhance',
     'temp' : '/admin/moderationCabinet/enhance',
     'caption': 'Кабінет Модератора' 
    },
    {'name' : 'Moder_review_quiz',
     'temp' : '/admin/assessments/review',
     'caption': 'review_quiz' 
    }
  ],
    user:
  [
    {'name' : 'User_cabinet',
     'temp' : '/admin/personalCabinet',
     'caption': 'default' 
    },
    {'name' : 'User_published',
     'temp' : '/admin/personalCabinet/published',
     'caption': 'published' 
    },
    {'name' : 'User_enhance',
     'temp' : '/admin/personalCabinet/enhance',
     'caption': 'enhance' 
    },
    {'name' : 'User_review',
     'temp' : '/admin/personalCabinet/review',
     'caption': 'review' 
    },
    {'name' : 'User_draft',
     'temp' : '/admin/personalCabinet/draft',
     'caption': 'draft' 
    },
    {'name' : 'User_profile',
     'temp' : '/admin/personalCabinet/profile',
     'caption': 'profile' 
    },
    {'name' : 'User_create_quiz',
     'temp' : '/admin/assessments/create',
     'caption': 'create_quiz' 
    },
    {'name' : 'User_edit_quiz',
     'temp' : '/admin/assessments/edit',
     'caption': 'edit_quiz' 
    },
    {'name' : 'User_statistic',
     'temp' : '/admin/statistic',
     'caption': 'user_statistic' 
    },
    {'name' : 'User_statistic',
     'temp' : '/admin/statistic/list',
     'caption': 'user_statistic' 
    },
    {'name' : 'User_statistic',
     'temp' : '/admin/statistic/general',
     'caption': 'user_statistic' 
    }



  ],
  menuAcces: 
  [
    {'name' : 'menuPersonalCabinet',
     'temp' : '/admin/personalCabinet/profile',
     'caption': 'Особистий кабінет' 
    },

    {'name' : 'menuAdminPanel',
     'temp' : '/administration-panel/userTab',
     'caption': 'Панель Адміністратора' 
    },

    {'name' : 'menuModerationCabinet',
     'temp' : '/admin/moderationCabinet',
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
    var access = 'false';
    return {
      getResponse: function(){
      
        var defer = $q.defer();
        access = 'pending';

        $http.get(CONFIG.BASE_URL + '/permission')
          .success(function (data) {
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
            access = 'true';
            defer.resolve(true);
            })
            .error(function(data) {
              tabsByRoles = {};
              access = 'false';
              defer.reject(data);
            });
      return defer.promise;     
      },
      getTabs: function (role) {
        var defer = $q.defer();

          if (tabsByRoles[role] && (access === 'true')) {
            defer.resolve(tabsByRoles[role]);
          } else {
            if (access === 'false') {
              defer.reject('unauthorized');
            };
          };
        return defer.promise;
      }
    }
}])
.factory('getAccess', ['getTabTemplates', '$q',
  function (getTabTemplates, $q) {
    return function (curUrl, role) {

      var defer = $q.defer();
      var access = {};
      var tabs;

      getTabTemplates.getTabs(role).then(function (data) {
        tabs = data;
      if (!tabs) {
        defer.reject(false);
        return defer.promise;
      }; 
      angular.forEach(tabs, function (tab) {
        access[tab.temp] = tab;
      });
      if (!access[curUrl]) {
        defer.reject(false);
        return defer.promise;
      };
      defer.resolve(true);
  }, function () {
   defer.reject(false);
  });
    return defer.promise;
    }}])
.run(function (getTabTemplates) {//get access tabs on page load for logged in user or guest
  getTabTemplates.getResponse().then(function(){});
});
