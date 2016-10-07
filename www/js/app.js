// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Crossing', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login',{
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'loginController'
      })

      .state('main',{
        url:'/main:{user_id}',
        templateUrl:'templates/main.html',
        controller:'mainController'
      })

      .state('bloomlist',{
        url:'/bloomlist:{user_id}',
        templateUrl:'templates/bloomlist.html',
        controller:'bloomlistController'
      })

      .state('place',{
        url:'/place:{user_id}',
        templateUrl:'templates/place.html',
        controller:'placeController'
      })

      .state('crossing',{
        url:'/crossing:{user_id}/{place_id}/{name}',
        templateUrl:'templates/crossing.html',
        controller:'crossingController'
      })


    $urlRouterProvider.otherwise('/login')
})

.service('GlobalService',function(){

  return {
      hostname : "http://www.canebreeding.com/webservice/"
      // hostname : "http://192.168.8.1/canebreeding/webservice/"
  }

});
