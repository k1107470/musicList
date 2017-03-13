/**
 * Created by Administrator on 2017/3/7.
 */

(function(angular){
    angular.module('app.route',['ui.router','app.songList','app.searchList','app.details','app.audio'])
        .config([
            '$stateProvider','$urlRouterProvider',
            function($stateProvider,$urlRouterProvider){
                $stateProvider
                    .state('music',{
                        url:'/music',
                        abstract:true,
                        templateUrl:'templates/player.html',
                        controller:'AudioController'
                    })
                    .state('music.home',{
                        url:'/home',
                        //controller:'MainController',
                        templateUrl:'templates/home.html'
                    })
                    .state('music.tabs',{
                        url:'/tabs',
                        //controller:'MainController',
                        templateUrl:'templates/tabs.html'

                    })
                    .state('music.tabs.list',{
                        url:'/list/:id',
                        controller:'SongListController',
                        templateUrl:'templates/songList.html'

                    })
                    .state('music.tabs.search',{
                        url:'/search',
                        controller:'SearchListController',
                        templateUrl:'templates/searchList.html'

                    })
                    .state('music.tabs.details',{
                        url:'/details',
                        controller:'DetailsController',
                        templateUrl:'templates/details.html'

                    })
                ;
                $urlRouterProvider.otherwise('/music/tabs/list/27');
            }]);
})(angular);