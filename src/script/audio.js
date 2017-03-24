/**
 * Created by Administrator on 2017/3/13.
 */
(function(angular){
    'use strict';
    angular.module('app.audio',[])
        .controller('AudioController',['$scope','$window','MainService',function($scope,$window,MainService){
            //console.log($document[0].documentElement.clientWidth);
            //获取屏幕的宽度
            $scope.clientWidth = $window.document.documentElement.clientWidth||$window.innerWidth||$window.document.body.clientWidth;
            /*实例化一个播放器组件*/
             var  player  = new Player({
                container: 'playerContainer',
                audio: 'myPlayer'
            });
            $scope.playList = [];

            //获得该项返回的字面量对象
            //数组或对象
            function getItem(obj){
                if(obj.constructor ==Array){
                    var arr = [];
                    for(var i = 0 ;i < obj.length;i++){
                        arr.push({
                            id: +new Date()+i,
                            songId:obj[i].songid,
                            name:obj[i].songname,
                            src:obj[i].url||getUrl(obj[i].songid)
                        });
                    }
                    return arr;
                }else if(obj.constructor == Object){
                    return {
                        id: +new Date(),
                        songId:obj.songid,
                        name:obj.songname,
                        src:obj.url||getUrl(obj.songid)
                    };
                }


            }
            //添加到播放列表
            //可以传入数组或者单个对象
            $scope.addToList = function(obj){
                var list = getItem(obj);
                //末尾追加
                $scope.playList=$scope.playList.concat(list);

                player.list = $scope.playList;

                //更新列表
                player.upDateList();

            };
            function getUrl(id){
                return "http://ws.stream.qqmusic.qq.com/"+id+".m4a?fromtag=46";
            }
            //点击项的播放图标触发播放事件
            //可以传入数组或者单个对象
            $scope.playItem = function(obj){
                //判断当前播放的下标，如果列表为空则为0，否则自增1
                player.index = player.list.length == 0 ? 0 : player.index + 1;
                //加入到列表中
                //插入当前位置
                $scope.playList=$scope.playList.splice(0,player.index).concat(getItem(obj)).concat($scope.playList);

                player.list = $scope.playList;
                $scope.addToList(obj);
                //播放当前位置的音乐
                player.playIndex(player.list[player.index].id);
                //触发hover事件
                $window.hoverAndLeave();

            };

            $scope.removeList = function(){
                $scope.playList = [];
                player.list = [];
                player.index = 0;
                //更新列表
                player.upDateList();
            }

        }])
})(angular);