/**
 * Created by Administrator on 2017/3/13.
 */
(function(){
    'use strict';
    angular.module('app.audio',[])
        .controller('AudioController',['$scope',function($scope){
            /*实例化一个播放器组件*/
            $scope.player  = new Player({
                container: '.playerContainer',
                audio: '#myPlayer'
            });
            $scope.playItem = function(item){
                $scope.player.audio.src = item.url;
                $scope.player.audio.load();
                $scope.player._playPause();
                $scope.player.updataTimeBy(item.seconds);
                $scope.player._update();
                //console.log(player.audio.duration);

                //$scope.playAddress = $sce.trustAsResourceUrl($scope.playAddress);
                //

            };
        }])
})();