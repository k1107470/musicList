/**
 * Created by Administrator on 2017/3/13.
 */
(function(angular){
    angular.module('app.service',[])
        .service('MainService',['$sce','$http','params',function($sce,$http,params){
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

            //根据关键词（歌手或歌名），返回搜索数据,默认每页20条数据
            this.getSearch = function(keyword,func){
                var url = params.searchAddress+'showapi_appid='+params.showapi_appid + '&showapi_sign='+params.showapi_sign
                    +'&keyword='+keyword;
                url = $sce.trustAsResourceUrl(url);
                $http.jsonp(url,{jsonpCallbackParam:'jsonpcallback'}).then(func);
            }
        }])
})(angular);