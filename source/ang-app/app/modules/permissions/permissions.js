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


// 'use strict';

// angular.module('yunakQuiz.permission', ['ngRoute'])

// .constant('tabs', {
//   admin: 
//   [
//     {'name' : 'adminUsersTab',
//      'temp' : '/administration-panel/',
//      'caption': 'Користувачі' 
//     },

//     {'name' : 'adminBlackListTab',
//      'temp' : '/administration-panel/blacklistTab',
//      'caption': 'Чорний список'
//     },

//     {'name' : 'adminAdministrationTab',
//      'temp' : '/administration-panel/administrationTab',
//      'caption': 'Адміністрація'
//     },

//     {'name' : 'adminModeratorsTab',
//      'temp' : '/administration-panel/moderatorsTab',
//      'caption': 'Модератори'
//     },

//     {'name' : 'adminCategoriesTab',
//      'temp' : '/administration-panel/quizzescategoriesTab',
//      'caption': 'Категорії тестів'
//     },

//     {'name' : 'adminAboutUsTab',
//      'temp' : '/administration-panel/aboutusTab',
//      'caption': 'Про нас'
//     },

//     {'name' : 'adminFAQ',
//      'temp' : '/administration-panel/faqTab',
//      'caption': 'Часті запитання'
//     }
//   ],  
//   moder:
//   [
//     {'name' : 'Moder_cabinet',
//      'temp' : '/admin/moderationCabinet',
//      'caption': 'Кабінет Модератора' 
//     },
//     {'name' : 'Moder_published',
//      'temp' : '/admin/moderationCabinet/published',
//      'caption': 'Кабінет Модератора' 
//     },
//     {'name' : 'Moder_review',
//      'temp' : '/admin/moderationCabinet/review',
//      'caption': 'Кабінет Модератора' 
//     },
//     {'name' : 'Moder_enhance',
//      'temp' : '/admin/moderationCabinet/enhance',
//      'caption': 'Кабінет Модератора' 
//     },
//     {'name' : 'Moder_review_quiz',
//      'temp' : '/admin/assessments/review',
//      'caption': 'review_quiz' 
//     }
//   ],
//     user:
//   [
//     {'name' : 'User_cabinet',
//      'temp' : '/admin/personalCabinet',
//      'caption': 'default' 
//     },
//     {'name' : 'User_published',
//      'temp' : '/admin/personalCabinet/published',
//      'caption': 'published' 
//     },
//     {'name' : 'User_enhance',
//      'temp' : '/admin/personalCabinet/enhance',
//      'caption': 'enhance' 
//     },
//     {'name' : 'User_review',
//      'temp' : '/admin/personalCabinet/review',
//      'caption': 'review' 
//     },
//     {'name' : 'User_draft',
//      'temp' : '/admin/personalCabinet/draft',
//      'caption': 'draft' 
//     },
//     {'name' : 'User_profile',
//      'temp' : '/admin/personalCabinet/profile',
//      'caption': 'profile' 
//     },
//     {'name' : 'User_create_quiz',
//      'temp' : '/admin/assessments/create',
//      'caption': 'create_quiz' 
//     },
//     {'name' : 'User_edit_quiz',
//      'temp' : '/admin/assessments/edit',
//      'caption': 'edit_quiz' 
//     },
//     {'name' : 'User_statistic',
//      'temp' : '/admin/statistic',
//      'caption': 'user_statistic' 
//     }

//   ],
//   menuAcces: 
//   [
//     {'name' : 'menuPersonalCabinet',
//      'temp' : '/admin/personalCabinet/profile',
//      'caption': 'Особистий кабінет' 
//     },

//     {'name' : 'menuAdminPanel',
//      'temp' : '/administration-panel/userTab',
//      'caption': 'Панель Адміністратора' 
//     },

//     {'name' : 'menuModerationCabinet',
//      'temp' : '/admin/moderationCabinet',
//      'caption': 'Кабінет Модератора' 
//     }        
//   ]  
// })

// .factory('getTabTemplates', [
//   "$location",
//   "$http",
//   "tabs",
//   "$q",
//   'CONFIG',
//   function($location, $http, tabs, $q, CONFIG) {
//     var tabsByRoles = {};
  
//     return {
//       getResponse: function(){
      
//         var defer = $q.defer();

//         $http.get(CONFIG.BASE_URL + '/permission').success(function (data) {
//           var userAccess = data;
//           tabsByRoles = {};
// // helper function to sort tabs by roles
//           function sortTabsByRoles(givenTabs, role) {
//             angular.forEach(userAccess, function (uAccess) {
//               angular.forEach(givenTabs, function (givenTab) {
//                 if(givenTab.name == uAccess) {
//                   tabsByRoles[role].push(givenTab);
//                 }
//               });            
//             });
//           }
// // sort tabs by all roles which stored in constant , roles will be key wor array of tabs
//           function initRolesTabs(rolesToInit) {
//             for(var role in rolesToInit) {
//               tabsByRoles[role] = [];
//               sortTabsByRoles(tabs[role], role);
//             }
//           };
//           initRolesTabs(tabs);
//           defer.resolve(true);
//           })
//           .error(function(data) {
//             tabsByRoles = {};
//             defer.reject(data);
//           });
//       return defer.promise;     
//       },
//       getTabs: function (role) {
//         if (tabsByRoles[role]) {
//           return tabsByRoles[role];
//         };
//         return false;
//       }
//     }
// }])
// .factory('getAccess', [
//   "$location",
//   "$http",
//   'getTabTemplates',
//   function ($location, $http, getTabTemplates) {
//     return function (curUrl, role) {
//       var access = {};
//       var tabs;

//       tabs = getTabTemplates.getTabs(role);
//       if (!tabs) {
//         return false;
//       }; 
//       angular.forEach(tabs, function (tab) {
//         access[tab.temp] = tab;
//       });
//       if (!access[curUrl]) {
//         return false;
//       } 
//       return true;
//   };
// }])
// .run(function (getTabTemplates) {//get access tabs on page load for logged in user or guest
//   getTabTemplates.getResponse().then(function(){});
// });
