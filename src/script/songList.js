/**
 * Created by Administrator on 2017/3/7.
 */
(function(angular){
    angular.module('app.songList', [])
        .controller('SongListController', ['$scope','$http','$stateParams', 'params',function ($scope,$http,$stateParams,params) {

            //console.log($stateParams);
            //console.log(params);

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





        }]);
})(angular);