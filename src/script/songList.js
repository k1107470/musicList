/**
 * Created by Administrator on 2017/3/7.
 */
(function(angular){
    angular.module('app.songList', ['app.service'])
        .controller('SongListController', [
            '$scope','$http','$stateParams','MainService',
            function ($scope,$http,$stateParams,MainService) {

            //console.log($stateParams);
            //console.log(params);

            $scope.list =[];
            $scope.topid = $stateParams.id;

            MainService.getSong($scope.topid,function(res){
                //console.log(res);
                $scope.list = res.data.showapi_res_body.pagebean.songlist;
            });




        }]);
})(angular);