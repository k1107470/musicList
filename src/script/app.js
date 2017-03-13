/**
 * Created by Administrator on 2017/3/7.
 */

(function(angular){
    var myApp = angular.module('musicList',['app.route','app.config']);
    /*自定义字符串长度过滤器*/
    myApp.filter('cut', function () {
        /**
         *
         * @param value 过滤的文本
         * @param wordwise 布尔类型，是否去除字符串右边空格
         * @param max  需要过滤的长度
         * @param tail 省略的字符
         * @returns {*}
         */
         return function (value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        });

    myApp.config(['$locationProvider',function($locationProvider){
        $locationProvider.hashPrefix('');
    }]);
    myApp.controller('AppController',['$scope',function($scope){
        /*实例化一个播放器组件*/
        $scope.player  = new Player({
            container: '.playerContainer',
            audio: '#myPlayer'
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
    }])
})(angular);