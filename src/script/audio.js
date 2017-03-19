/**
 * Created by Administrator on 2017/3/13.
 */
(function(angular){
    'use strict';
    angular.module('app.audio',[])
        .controller('AudioController',['$scope','$document',function($scope,$document){
            //console.log($document[0].documentElement.clientWidth);
            $scope.clientWidth = $document[0].documentElement.clientWidth;
            /*实例化一个播放器组件*/
            $scope.player  = new Player({
                container: 'playerContainer',
                audio: 'myPlayer'
            });
            $scope.playList = $scope.player.list;

            //获得该项返回的字面量对象
            function getItem(item){
                var item = {
                    id: +new Date(),
                    songId:item.songid,
                    name:item.songname,
                    src:item.url||item.m4a||getUrl(item.songid)
                };
                return item;
            }
            //添加到播放列表
            $scope.addToList = function(item){
                /*$scope.playList.push({
                    id: +new Date(),
                    songId:item.songid,
                    name:item.songname,
                    src:item.url||item.m4a||getUrl(item.songid)
                });*/
                $scope.playList.push(getItem(item));
                //更新列表
                $scope.player.upDateList();
            };
            function getUrl(id){
                return "http://ws.stream.qqmusic.qq.com/"+id+".m4a?fromtag=46";
            }
            //点击项的播放图标触发播放事件
            $scope.playItem = function(item){
                //如果数组为空
                if($scope.playList.length == 0){
                    //添加至列表，并播放
                    $scope.addToList(item);
                    $scope.player.trigger();
                }else {
                    //插到当前播放位置，并播放
                    //console.log(213);
                    var item = getItem(item);
                    $scope.playList.splice($scope.player.index,0,item);
                    $scope.player.playIndex(item.id);
                    $scope.player.updateTime();
                }

            };

        }])
})(angular);