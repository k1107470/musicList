/**
 * Created by Administrator on 2017/3/13.
 */
(function (angular) {
    angular.module('app.service', [])
        .service('MainService', [
            '$sce', '$http', '$stateParams', '$window', '$document', 'params',
            function ($sce, $http, $stateParams, $window, $document, params) {
                //没有获得到数据
                //this.miss = undefined;//1代表得到数据，-1代表没有得到数据

                //根据榜单的topid，返回数据
                //var that = this;
                this.getSong = function (topid, func) {
                    var url = params.address + 'showapi_appid=' + params.showapi_appid + '&showapi_sign=' + params.showapi_sign
                        + '&topid=' + topid;
                    //将请求地址变安全
                    url = $sce.trustAsResourceUrl(url);
                    //console.log(url);
                    $http.jsonp(url, {jsonpCallbackParam: 'jsonpcallback'}).then(func, function () {
                        //that.miss = -1;
                        console.log('加载失败');
                    });
                    /*$http({
                     method:'get',
                     url:url
                     }).then(function(res){
                     //return res.data.showapi_res_body.pagebean.songlist;
                     });*/
                };

                //根据专辑id获得歌词
                this.getLyc = function (songid, func) {
                    var url = params.lycAddress + 'showapi_appid=' + params.showapi_appid + '&showapi_sign=' + params.showapi_sign
                        + '&musicid=' + songid;
                    //将请求地址变安全
                    url = $sce.trustAsResourceUrl(url);
                    //console.log(url);
                    $http.jsonp(url, {jsonpCallbackParam: 'jsonpcallback'}).then(func, function () {
                        //that.miss = -1;
                        console.log('加载失败');

                    });
                };


                //手写jsonp,其中qq音乐的回调函数名称为jsonpCallback,qq官方的搜索api不支持angular的回调函数
                this.jsonp = function (url, data, callback) {

                    var cb = 'jsonp' + (+new Date());
                    //第一步获取完整的查询字符串
                    var querystring = url.indexOf('?') ? '?' : '&';
                    for (var key in data) {
                        querystring += key + "=" + data[key] + '&';
                    }
                    //第二部获得完整的请求地址
                    querystring += "jsonpCallback" + "=" + cb;
                    //dom建立script节点
                    var scriptEle = $document[0].createElement('script');
                    scriptEle.src = url + querystring;
                    //console.log(script);
                    //第三步挂载回调函数

                    $window[cb] = function (data) {
                        callback(data);
                        //在执行完成callback回调后，删除jsonp使用的script标签
                        $document[0].body.removeChild(scriptEle);
                        //执行到这里说明获得到数据
                        //that.miss = 1;
                    };
                    //添加到html中
                    $document[0].body.appendChild(scriptEle);


                };
                //根据song_id返回图片
                this.getImg = function (id) {

                    var len = id.length;
                    var a = id.charAt(len - 1);
                    var b = id.charAt(len - 2);

                    return "http://i.gtimg.cn/music/photo/mid_album_90/" + b + "/" + a + "/" + id + ".jpg";

                };

                this.getBImg = function (id) {

                    var len = id.length;
                    var a = id.charAt(len - 1);
                    var b = id.charAt(len - 2);

                    return "http://i.gtimg.cn/music/photo/mid_album_300/" + b + "/" + a + "/" + id + ".jpg";

                };


            }])
})(angular);