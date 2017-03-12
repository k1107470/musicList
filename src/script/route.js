/**
 * Created by Administrator on 2017/3/7.
 */

(function(angular){
    angular.module('app.route',['ui.router','app.controller'])
        .config([
            '$stateProvider','$urlRouterProvider',
            function($stateProvider,$urlRouterProvider){
                $stateProvider
                    .state('music',{
                        url:'/music',
                        abstract:true,
                        templateUrl:'templates/player.html'
                    })
                    .state('music.home',{
                        url:'/home',
                        //controller:'MainController',
                        templateUrl:'templates/home.html'
                    })
                    .state('music.tabs',{
                        url:'/tabs/:id',
                        controller:'MainController',
                        templateUrl:'templates/list.html'

                    });
                $urlRouterProvider.otherwise('/music/tabs/27');
            }]);
})(angular);