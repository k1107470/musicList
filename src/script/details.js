/**
 * Created by Administrator on 2017/3/13.
 */
(function (angular) {
    'use strict';
    angular.module('app.details', [])
        .controller('DetailsController',
            ['$scope', '$stateParams', 'MainService', 'params',
                function ($scope, $stateParams, MainService, params) {

                    //歌曲专辑信息
                    $scope.detail = [];
                    //歌词
                    $scope.lyc = [];
                    //获取歌手名称，歌曲id,专辑mid
                    $scope.songid = $stateParams.songid;
                    $scope.albummid = $stateParams.albummid;

                    //获得歌曲专辑信息
                    var promise1 = MainService.getDetail();
                        promise1.then(
                          function(res){
                              $scope.detail = res.data;
                              console.log($scope.detail);
                              get($scope.detail);//一些需要返回数据而同步的数据
                          },function(res){
                                console.log("获取失败");
                            }
                        );

                    console.log($scope.detail);
                    /*MainService.jsonp(params.detailUrl, {albummid: $scope.albummid}, function (res) {

                        $scope.detail = res.data;
                        //console.log($scope.detail);
                        $scope.$apply();
                    });*/
                    //获得歌词
                    var promise2 = MainService.getLyc($scope.songid);
                    promise2.then(
                        function(res){
                            $scope.lyc = getArr(res.data.showapi_res_body.lyric_txt);
                            console.log($scope.lyc);
                        },function(res){
                            console.log("获取失败");
                        }
                    );
                    /*MainService.getLyc($scope.songid, function (res) {
                        //console.log(res.data.showapi_res_body);
                        $scope.lyc = getArr(res.data.showapi_res_body.lyric_txt);

                    });*/

                    //去除两边空格的方法
                    function trim(str) {
                        return str.replace(/(^\s*)|(\s*$)/g, '');
                    }
                    //整理歌词格式的方法
                    function getArr(str) {
                        if(str == ''){
                            getArr(str);
                        }
                        var arr = trim(str).split('    ');

                        var result = [];
                        //遍历传入的参数每一项
                        for (var i = 0; i < arr.length; i++) {
                            if (trim(arr[i]) != '') {
                                result.push(trim(arr[i]));
                            }
                        }

                        return result;
                    }

                    function get (detail) {
                        //获得大图
                        $scope.getImg = MainService.getBImg;

                        //获得歌曲名称
                        $scope.getSongname = function(){
                            //获得专辑歌曲列表
                            var list = detail.list;
                            for(var i  in list){
                                if($scope.songid == list[i].songid){
                                    /*for(var j = 0; j < list[i].singer.length; j++){
                                     singer += list[i].singer[j].name + ' ';
                                     }*/

                                    return list[i].songname;
                                }
                            }
                        };

                        //通过songid查询歌手
                        $scope.getSinger = function(){
                            var singer = '';
                            //获得专辑歌曲列表
                            var list = detail.list;
                            for(var i  in list){
                                if($scope.songid == list[i].songid){
                                    /*for(var j = 0; j < list[i].singer.length; j++){
                                     singer += list[i].singer[j].name + ' ';
                                     }*/
                                    singer = list[i].singer[0].name;
                                    return singer;
                                }
                            }
                        };

                        //获得歌曲对象
                        $scope.getItem = function(){
                            //获得专辑歌曲列表
                            var list = detail.list;
                            for(var i  in list){
                                if($scope.songid == list[i].songid){
                                    /*for(var j = 0; j < list[i].singer.length; j++){
                                     singer += list[i].singer[j].name + ' ';
                                     }*/
                                    return list[i];
                                }
                            }
                        };
                    }

                }])
})(angular);