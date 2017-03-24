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
    myApp.controller('AppController',['$scope','$state','MainService',function($scope,$state,MainService){
        $scope.keyword = '';
        $scope.show_flag = false;
        $scope.search = function(){
            if($scope.keyword.replace(/(^\s*)|(\s*$)/g, '') == ''){
                return;
            }
            //console.log($scope.keyword);
            $state.go('music.tabs.search',{page:1,keyword:$scope.keyword});
            //$location.url('/music/tabs/search/1/'+ $scope.keyword);
        };
        $scope.showOrHide = function(){
            $scope.show_flag = !$scope.show_flag;
        };
        $scope.list_27 =[];//新歌榜
        $scope.list_26 =[];//热歌榜
        $scope.list_4 =[];//流行榜

        MainService.getSong(27,function(res){

            $scope.list_27 = res.data.showapi_res_body.pagebean.songlist.slice(0,5);
            //console.log($scope.list_27);
        });
        MainService.getSong(26,function(res){
            $scope.list_26 = res.data.showapi_res_body.pagebean.songlist.slice(0,5);
            //console.log($scope.list_26);

        });
        MainService.getSong(4,function(res){
            $scope.list_4 = res.data.showapi_res_body.pagebean.songlist.slice(0,5);
            //console.log($scope.list_4);

        });
    }])
})(angular);