/**
 * Created by Administrator on 2017/3/13.
 */
(function(angular){
    'use strict';
    angular.module('app.searchList',['app.service'])
        .controller('SearchListController',[
            '$scope','$stateParams','MainService',
            function($scope,$stateParams,MainService){
            $scope.search = [];
            $scope.page = $stateParams.p;
            $scope.keyword = $stateParams.keyword;
            //console.log($stateParams);
            MainService.getSearch($scope.keyword,function(res){
                console.log(res);
                console.log(res.data.showapi_res_body.pagebean.contentlist);
                $scope.search = res.data.showapi_res_body.pagebean.contentlist;
            })
        }])
})(angular);