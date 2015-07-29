angular.module('unicornguide', ['firebase', 'ui.router', 'ngSanitize'])
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
    .state('accelerator', {
      url: "/accelerator/:slug",
      templateUrl: '/partials/accelerator.details.html',
      controller: function ($stateParams, FB, $firebaseObject) {
        var _self = this;
        _self.data = {};
        FB.child("accelerators").orderByChild("slug")
        _self.data = $firebaseObject(FB.child("accelerators/" + $stateParams.slug));
      },
      controllerAs: "accelerator"
    });
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
.filter('firstParagraph', function() {
  return function(input) {
    return  input ? input.replace(/\..*|\n.*/g,'.') : "";
  };
})
.filter('nl2p', function() {
  return function(text) {
    text = text !== undefined ? String(text).trim() : "";
    return (text.length > 0 ? '<p>' + text.replace(/[\r\n]+/g, '</p><p>') + '</p>' : "");
  };
});