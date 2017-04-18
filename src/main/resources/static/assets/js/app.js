var myApp = angular.module("biblioBGApp", ['ngRoute', 'angular-loading-bar', 'ngMaterial', 'ngAnimate']);

myApp.config(function ($routeProvider) {
    $routeProvider

            .when('/home', {
                templateUrl: 'views/import.html',
                controller: 'ImportController'
            })

            .when('/ouvrages', {
                templateUrl: 'views/ouvrages.html',
                controller: 'OuvrageController'
            })

            .when('/fonds-documentaires', {
                templateUrl: 'views/fonds_documentaires.html',
                controller: 'FondDocumentaireController'
            })

            .when('/missions', {
                templateUrl: 'views/missions_bg.html',
                controller: 'MissionBGController'
            })

            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'AdminController'
            })

            .otherwise({redirectTo: '/home'});
});
