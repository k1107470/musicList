/**
 * Created by Administrator on 2017/3/11.
 */
(function(angular){
    'use strict';
    angular.module('app.config',[])
        .constant('params',{
            showapi_appid:'33166',
             showapi_sign:'346362089aad4e5680f74ffdaa7e0c2f',
             address:"http://route.showapi.com/213-4?",//榜单查询地址，参数topid来区分榜单
             searchAddress:'http://route.showapi.com/213-1?'//搜索地址，参数keyword->string,page默认20项

            /*//查询歌曲的vkey值的地址所需固定参数，guid，cid
            //更改的参数，songmid;filename=C400+歌曲的strMediaMid+.m4a;callback=自定义
            addressForVkey:'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?',
            guid:7910925412,
            cid:205361747,
            //通过vkey获取高品质m4a地址
            //固定参数有fromtag，uin（个人账号）    guid同上，vkey为上面查询获得
            addressForM4a:'http://dl.stream.qqmusic.qq.com/',//后面更上C400+strMediaMid.m4a+?参数
            fromtag:66,
            uin:524322807,
            //榜单 topid指定榜单类型，jsonpCallback指定回调函数名称
            address:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
            format:'jsonp',
            song_begin:0,//起始项的序列号
            song_num:30,//分页多少项
            //搜索api  format=jsonp,jsonCallback自定义,n=需要搜索多少项，（30分页最大）;p分页下的第几页0等于1的情况
            //w=搜索的关键词
            addressForSearch:'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?',
            //低音质在线播放流媒体地址
            addressForPlay:'http://ws.stream.qqmusic.qq.com/',//+song_id.m4a?fromtag=46
            //专辑图片地址
            addressImg300:'http://i.gtimg.cn/music/photo/mid_album_300/',//+002Vq6k10Ux6sx.jpg
            addressImg90:'http://i.gtimg.cn/music/photo/mid_album_90/'//+002Vq6k10Ux6sx.jpg*/
        });
})(angular);