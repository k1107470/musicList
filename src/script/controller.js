/**
 * Created by Administrator on 2017/3/7.
 */
angular.module('app.controller', [])
    .controller('MainController', ['$scope','$http','$stateParams', 'params',function ($scope,$http,$stateParams,params) {

        //console.log($stateParams);
        //console.log(params);
        /*实例化一个播放器组件*/
        $scope.player  = new Player({
            container: '.playerContainer',
            audio: '#myPlayer'
        });
        $scope.list =[];
        $scope.topid= $stateParams.id;
        //$scope.playAddress='http://ws.stream.qqmusic.qq.com/200954204.m4a?fromtag=46';
        var url = params.address+'showapi_appid='+params.showapi_appid + '&showapi_sign='+params.showapi_sign
                    +'&topid='+$scope.topid;
        //console.log(url);
        $http({
            method:'get',
            url:url
        }).then(function(res){
           //console.log(res);
            $scope.list = res.data.showapi_res_body.pagebean.songlist;
            //console.log($scope.list);
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



    }]);