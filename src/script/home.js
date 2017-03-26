/**
 * Created by Administrator on 2017/3/7.
 */

(function (angular) {
    var myApp = angular.module('musicList', ['app.route', 'app.config']);
    /*自定义字符串长度过滤器*/
    /* myApp.filter('cut', function () {
     /!**
     *
     * @param value 过滤的文本
     * @param wordwise 布尔类型，是否去除字符串右边空格
     * @param max  需要过滤的长度
     * @param tail 省略的字符
     * @returns {*}
     *!/
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
     });*/

    myApp.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
    myApp.controller('HomeController', ['$scope', '$state', '$q', 'MainService', function ($scope, $state, $q, MainService) {
        $scope.keyword = '';
        $scope.show_flag = false;
        $scope.search = function () {
            if ($scope.keyword.replace(/(^\s*)|(\s*$)/g, '') == '') {
                return;
            }
            //console.log($scope.keyword);
            $state.go('music.tabs.search', {page: 1, keyword: $scope.keyword});
            //$location.url('/music/tabs/search/1/'+ $scope.keyword);
        };
        $scope.showOrHide = function () {
            $scope.show_flag = !$scope.show_flag;
        };
        $scope.listArr = [];
        $scope.list_27 = [];//新歌榜
        $scope.list_26 = [];//热歌榜
        $scope.list_4 = [];//流行榜


        $scope.loadData = function () {
            console.log("加载数据...");
        };

        $q.all([MainService.getSong(27), MainService.getSong(26), MainService.getSong(4)])
            .then(
                function (dataArr) {
                    //console.log(dataArr);
                    var flag = !!dataArr[0].data.showapi_res_body.pagebean.songlist && !!dataArr[1].data.showapi_res_body.pagebean.songlist && !!dataArr[2].data.showapi_res_body.pagebean.songlist;
                    if (flag) {
                        $scope.list_27 = dataArr[0].data.showapi_res_body.pagebean.songlist.slice(0, 4);
                        $scope.list_26 = dataArr[1].data.showapi_res_body.pagebean.songlist.slice(0, 4);
                        $scope.list_4 = dataArr[2].data.showapi_res_body.pagebean.songlist.slice(0, 4);
                        $scope.listArr = [];
                        $scope.listArr.push($scope.list_27);
                        $scope.listArr.push($scope.list_26);
                        $scope.listArr.push($scope.list_4);
                    }

                }, function () {
                    console.log('获取失败');
                }
            );

    }]);
    //定义一个轮播图指令
    myApp.directive('lunbo', function () {
        return {
            restrict: 'AE',
            controller: 'HomeController',
            templateUrl: 'lunbo.html',
            link: function (scope, element, attr) {
                var step = 0;
                var timer;



                timer = setInterval(t, 3000);

                function t() {
                    element.find("li").addClass("ishide");
                    element.find("li").removeClass("active");
                    element.find("i").removeClass("active");
                    step++;
                    step = step % 3;

                    element.find("li").eq(step).addClass('active');
                    element.find("i").eq(step).addClass('active');

                }

                element.find('ul').bind('mouseenter', function () {
                    clearInterval(timer);
                });
                element.find('ul').bind('mouseleave', function () {
                    //console.log(123);
                    clearInterval(timer);
                    timer = setInterval(t, 3000);
                });

                element.find('a').eq(0).bind('click', function () {
                    step = step -2;
                    t();
                });
                element.find('a').eq(1).bind('click', function () {
                    t();
                });

                element.find('i').bind('click',function(){
                    var num = parseInt(this.innerText);
                    //console.log(this.innerText);
                    element.find("li").eq(0).addClass("ishide");
                    element.find('i').removeClass('active');
                    element.find('i').eq(num).addClass('active');
                    element.find("li").removeClass("active");
                    element.find("li").eq(num).addClass('active');

                })
            }
        }
    })


})(angular);