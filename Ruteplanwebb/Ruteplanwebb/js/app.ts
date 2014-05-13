/// <reference path="../ts/typings/angularjs/angular.d.ts"/>
/// <reference path="../ts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="../ts/typings/angularjs/angular-ui-router.d.ts"/>

var rpwApp = angular.module("rpwApp", [
    'ui.router',
    "ng-context-menu",
    "ui.bootstrap",
    'ngSanitize',
    'rpwControllers',
    "rpwFilters",
    "rpwDirectives"
]);

rpwApp.config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider : ng.ui.IUrlRouterProvider) => {
        $urlRouterProvider.otherwise("/");
        $stateProvider.
            state('mappage', {
                url: '/?from&to',
                templateUrl: 'Views/MapView.html',
                controller: 'MapController',
                reloadOnSearch: false
    });
    }]);
