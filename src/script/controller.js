/**
 * Created by Administrator on 2017/3/7.
 */
angular.module('app.controller', [])
    .controller('MainController', ['$scope','$http', 'params',function ($scope,$http,params) {
        //console.log(params);
        $scope.list =[];





        /*实例化一个播放器组件*/
        var player = new Player({
            container: '.playerContainer',
            audio: '#myPlayer'
        });
    }]);