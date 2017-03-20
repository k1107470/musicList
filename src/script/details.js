/**
 * Created by Administrator on 2017/3/13.
 */
(function(angular){
    'use strict';
    angular.module('app.details',[])
        .controller('DetailsController','$stateParams','MainService', 'params',
            ['$scope',function($scope,$stateParams,MainService,params){

                //歌曲专辑信息
                $scope.detail = [];
                //歌词
                $scope.lyc = [];
                //获取歌手名称，歌曲id,专辑mid
                $scope.singer = $stateParams.singer;
                $scope.songid = $stateParams.songid;
                $scope.albummid = $stateParams.albummid;
                //获得歌曲专辑信息
                MainService.jsonp(params.detailUrl,{albummid:$scope.albummid},function(res){
                    consol.log(res);


                    $scope.$apply();
                });

                //获得歌词
                MainService.getLyc($scope.songid,function(res){
                   console.log(res);
                   $scope.lyc = getArr(res.data.showapi_res_body.lyric_txt) ;
                });

                function trim(str){
                    return str.replace(/(^\s*)|(\s*$)/g, '');
                }

                function getArr (str){
                    var arr = trim(str).split(' ');

                    var result = [];
                    //遍历传入的参数每一项
                    for (var i = 0; i < arr.length; i++) {
                        if(trim(arr[i]) != ''){
                            result.push(arr[i]);
                        }
                    }

                    return result;
                }
        }])
})(angular);