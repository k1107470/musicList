/**
 * Created by Administrator on 2017/3/13.
 */
(function(angular){
    angular.module('app.service',[])
        .service('MainService',[
            '$sce','$http','$stateParams','$window','$document','params',
            function($sce,$http,$stateParams,$window,$document,params){
            //定义一个空的list对象，用来存放可能用得到的json数据
            var list = [];
            //console.log(params);

            //根据榜单的topid，返回数据
            this.getSong = function(topid,func){
                var url = params.address+'showapi_appid='+params.showapi_appid + '&showapi_sign='+params.showapi_sign
                    +'&topid='+topid;
                //将请求地址变安全
                url = $sce.trustAsResourceUrl(url);
                //console.log(url);
                $http.jsonp(url,{jsonpCallbackParam:'jsonpcallback'}).then(func);
                /*$http({
                    method:'get',
                    url:url
                }).then(function(res){
                    //return res.data.showapi_res_body.pagebean.songlist;
                });*/
            };

            //根据专辑id获得歌词
            this.getLyc = function(songid,func){
                var url = params.lycAddress+'showapi_appid='+params.showapi_appid + '&showapi_sign='+params.showapi_sign
                    +'&musicid='+topid;
                //将请求地址变安全
                url = $sce.trustAsResourceUrl(url);
                //console.log(url);
                $http.jsonp(url,{jsonpCallbackParam:'jsonpcallback'}).then(func);
            };



            //手写jsonp,其中qq音乐的回调函数名称为jsonpCallback,qq官方的搜索api不支持angular的回调函数
            this.jsonp = function(url,data,callback){

                var cb = 'jsonp'+(+new Date());
                //第一步获取完整的查询字符串
                var querystring = url.indexOf('?') ? '?' : '&';
                for(var key in data){
                    querystring += key + "=" + data[key] + '&';
                }
                //第二部获得完整的请求地址
                querystring += "jsonpCallback"+"="+cb;
                //dom建立script节点
                var scriptEle = $document[0].createElement('script');
                scriptEle.src  = url+querystring;
                //console.log(script);
                //第三步挂载回调函数

                $window[cb] = function(data){
                    callback(data);
                    //在执行完成callback回调后，删除jsonp使用的script标签
                    $document[0].body.removeChild(scriptEle);
                };
                //添加到html中
                $document[0].body.appendChild(scriptEle);

            };
            //根据song_id返回图片
                this.getImg = function(id,flag){

                    var len = id.length;
                    var a = id.charAt(len-1);
                    var b = id.charAt(len-2);
                    if(flag)
                        return "http://i.gtimg.cn/music/photo/mid_album_300/"+b+"/"+a+"/"+id+".jpg";
                    else if(flag == undefined){
                        return "http://i.gtimg.cn/music/photo/mid_album_90/"+b+"/"+a+"/"+id+".jpg";
                    }
                };

        }])
})(angular);