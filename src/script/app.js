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
    myApp.controller('AppController',['$scope','$location',function($scope,$location){
        $scope.keyword = '';
        $scope.search = function(){
            //console.log($scope.keyword);
            $location.url('/music/search/1/'+ $scope.keyword)
        }
    }])
})(angular);