/**
 * Created by Administrator on 2017/3/11.
 */
(function (angular) {
    'use strict';
    angular.module('app.config', [])
        .constant('params', {
            showapi_appid: '33166',
            showapi_sign: '346362089aad4e5680f74ffdaa7e0c2f',
            address: "http://route.showapi.com/213-4?",//榜单查询地址，参数topid来区分榜单
            lycAddress:'http://route.showapi.com/213-2?',//musicid = songid
            searchAddress: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?',
            num: 20,
            detailUrl: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?'//?albummid=
            /*p=2&n=20&w=%E4%B8%89%E7%94%9F%E4%B8%89%E4%B8%96%E5%8D%81%E9%87%8C%E6%A1%83%E8%8A%B1&jsonpCallback=searchCallbacksong717&*/
        });
})(angular);