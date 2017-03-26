/**
 * Created by Administrator on 2017/3/13.
 */
(function (angular) {
    angular.module('app.service', [])
        .service('MainService', [
            '$sce', '$http', '$q','$stateParams', '$window', '$document', 'params',
            function ($sce, $http,$q, $stateParams, $window, $document, params) {


                //根据榜单的topid，返回数据
                //var that = this;
                this.getSong = function (topid) {
                    var deferred = $q.defer(); //声明承诺
                    var url = params.address + 'showapi_appid=' + params.showapi_appid + '&showapi_sign=' + params.showapi_sign
                        + '&topid=' + topid;
                    //将请求地址变安全
                    url = $sce.trustAsResourceUrl(url);
                    $http.jsonp(url,{jsonpCallbackParam: 'jsonpcallback'}).then(
                        function(data){//成功的回调
                            //console.log(data);
                            deferred.resolve(data);
                        },function(data){//失败的回调
                            console.log(222);
                            deferred.reject(data);
                        }
                    );
                    return deferred.promise;

                };

                //根据专辑id获得歌词
                this.getLyc = function (songid) {
                    var deferred = $q.defer(); //声明承诺
                    var url = params.lycAddress + 'showapi_appid=' + params.showapi_appid + '&showapi_sign=' + params.showapi_sign
                        + '&musicid=' + songid;
                    //将请求地址变安全
                    url = $sce.trustAsResourceUrl(url);
                    //console.log(url);
                    $http.jsonp(url, {jsonpCallbackParam: 'jsonpcallback'}).then(
                        function(data){//成功的回调
                            //console.log(data);
                            deferred.resolve(data);
                        },function(data){//失败的回调
                            deferred.reject(data);
                        }
                    );
                    return deferred.promise;
                };

                //手写搜索的jsonp
                this.getSearch = function(){ //获取搜索信息
                    var deferred = $q.defer(); //声明承诺
                    var url = params.searchAddress + 'n='+ params.num + '&p=' + $stateParams.page + '&w=' + $stateParams.keyword;
                    //将请求地址变安全
                    url = $sce.trustAsResourceUrl(url);


                    var cb = 'jsonp' + (+new Date());
                    //dom建立script节点
                    var scriptEle = $document[0].createElement('script');
                    scriptEle.src = url + "&jsonpCallback" + "=" + cb;
                    //console.log(script);
                    //第三步挂载回调函数

                    $window[cb] = function (data) {
                        deferred.resolve(data);
                        //在执行完成callback回调后，删除jsonp使用的script标签
                        $document[0].body.removeChild(scriptEle);

                    };
                    //添加到html中
                    $document[0].body.appendChild(scriptEle);

                    return deferred.promise;
                };

                //手写详细信息的jsonp
                this.getDetail = function(){
                    var deferred = $q.defer(); //声明承诺
                    var url = params.detailUrl + 'albummid=' + $stateParams.albummid;
                    //将请求地址变安全
                    url = $sce.trustAsResourceUrl(url);


                    var cb = 'jsonp' + (+new Date());
                    //dom建立script节点
                    var scriptEle = $document[0].createElement('script');
                    scriptEle.src = url + "&jsonpCallback" + "=" + cb;
                    //console.log(script);
                    //第三步挂载回调函数

                    $window[cb] = function (data) {
                        deferred.resolve(data);
                        //在执行完成callback回调后，删除jsonp使用的script标签
                        $document[0].body.removeChild(scriptEle);

                    };
                    //添加到html中
                    $document[0].body.appendChild(scriptEle);

                    return deferred.promise;
                };

                /*//手写jsonp,其中qq音乐的回调函数名称为jsonpCallback,qq官方的搜索api不支持angular的回调函数
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


                };*/
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