angular.module('unicornguide', ['firebase', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/partials/home.html",
      controller: "homeController",
      controllerAs: ""
    })
    .state('accelerators', {
      url: "/accelerators",
      templateUrl: "/partials/accelerators.html",
      controller: "accelController",
      controllerAs: "accelerators"
    })
})
.factory('FB', function(){
  return new Firebase("https://unicornguide.firebaseio.com");
})
.controller('homeController', function (FB, $firebaseArray) {
  var _self = this;
  _self.data = $firebaseArray(FB.child("accelerators"));
})
.controller('accelController', function (FB, $firebaseArray) {
  var _self = this;
  _self.data = $firebaseArray(FB.child("accelerators"));
})