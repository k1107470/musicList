/**
 * Created by Administrator on 2017/3/13.
 */
(function (angular) {
    'use strict';
    angular.module('app.searchList', ['app.service'])
        .controller('SearchListController', [
            '$scope', '$stateParams',  'MainService', 'params',
            function ($scope, $stateParams,  MainService, params) {


                //搜索列表
                $scope.search = [];
                $scope.keyword = '';

                //获得自定义的每页信息数量
                $scope.num = params.num;
                //定义返回的信息总数
                $scope.totalnum = 0;
                //定义总页数
                $scope.totalPage = 0;
                //定义当前页数
                $scope.currentPage = 0;

                //获得搜索的url地址
                $scope.searchUrl = params.searchAddress;


                var promise = MainService.getSearch();
                    promise.then(
                        function(res){
                            console.log(res);
                            $scope.search = res.data.song.list;
                            $scope.keyword = res.data.keyword;
                            $scope.totalnum = res.data.song.totalnum;
                            $scope.currentPage = res.data.song.curpage;
                            $scope.totalPage = Math.ceil($scope.totalnum / $scope.num);
                        },function(){
                            console.log('获取失败');
                        }
                    );
                //定义搜索字符串
                /*$scope.data = {
                    p: $stateParams.page,//当前页数
                    n: params.num,//每页的数量
                    w: $stateParams.keyword//搜索关键词
                };
                MainService.jsonp($scope.searchUrl, $scope.data, function (res) {
                    //console.log(res);
                    $scope.search = res.data.song.list;
                    $scope.keyword = res.data.keyword;
                    $scope.totalnum = res.data.song.totalnum;
                    $scope.currentPage = res.data.song.curpage;
                    $scope.totalPage = Math.ceil($scope.totalnum / $scope.num);
                    //console.log('总页数'+$scope.totalPage);
                    //console.log('当前页数'+$scope.currentPage);
                    //同步数据
                    $scope.$apply();
                });*/

                //获得90*90的图
                $scope.getImg = MainService.getImg;

            }])
})(angular);