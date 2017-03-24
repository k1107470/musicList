/**
 * Created by Administrator on 2017/3/7.
 */
(function (angular) {
    angular.module('app.songList', ['app.service'])
        .controller('SongListController', [
            '$scope', '$http', '$stateParams', 'MainService',
            function ($scope, $http, $stateParams, MainService) {




                $scope.list = [];
                $scope.topid = $stateParams.id;
                $scope.array = [{'id': 27, 'title': '新歌'}, {'id': 26, 'title': '热歌'}, {
                    'id': 4,
                    'title': '流行'
                }, {'id': 5, 'title': '内地'}, {'id': 6, 'title': '港台'}, {'id': 3, 'title': '欧美'}, {
                    'id': 17,
                    'title': '日本'
                }, {'id': 16, 'title': '韩国'}, {'id': 36, 'title': 'k歌金曲'}, {'id': 28, 'title': '网络歌曲'}];

                $scope.title = '';

                $scope.title = function () {
                    for (var i in $scope.array) {
                        if ($scope.topid == $scope.array[i].id) {
                            return $scope.array[i].title;
                        }
                    }
                }();

                MainService.getSong($scope.topid, function (res) {
                    $scope.list = res.data.showapi_res_body.pagebean.songlist;
                });


            }]);
})(angular);