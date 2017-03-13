/**
 * Created by Administrator on 2017/3/9.
 */
'use strict';

var Player = function (option) {
    //option为字面量对象，有container（容器）和target（audio的id）2个键值对
    this.init(option);
    //将音量绑定至音量条的height属性
    Object.defineProperty(this, 'volume', {
        get: function () {
            return document.querySelector('.volume-value').style.height;
        },
        set: function (val) {
            if (val >= 0 && val <= 1)
                document.querySelector('.volume-value').style.height = val * 100 + '%';
        }
    });
};

Player.prototype = {
    //初始化>>创建组件--绑定事件--渲染到页面制定容器并绑定audio标签
    init: function (option) {
        //判断参数类型，如果是字符串则转为dom元素
        this.container = option.container.constructor === String ? document.querySelector(option.container) : option.container;
        // console.log(this.containner);
        this.audio = option.audio.constructor === String ? document.querySelector(option.audio) : option.audio;
        // console.log(this.audio);
        // 默认音量为50%
        this.volume = 1;
        this.container.innerHTML = this._createDOMs();
        // console.log(this.container);
        this.bindEvent();

    },
    _createDOMs: function () {
        //确保组件的中类名唯一
        var player = '';
        player += ' <div class="audioPlayer">';
        player += '     <div class="playpause" title="播放">';
        player += '          <a>播放</a>';
        player += '     </div>';
        player += '     <div class="time time-current">00:00</div>';
        player += '     <div class="bar">';
        player += '          <div class="bar-loade"></div>';
        player += '          <div class="bar-played"></div>';
        player += '     </div>';
        player += '     <div class="time time-duration">00:00</div>';
        player += '     <div class="volume">';
        player += '          <div class="volume-button" title="声音">';
        player += '          <a></a>';
        player += '          </div>';
        player += '          <div class="volume-adjust">';
        player += '              <div class="volume-total">';
        player += '                  <div class="volume-max"></div>';
        player += '                  <div class="volume-value" style="height:50%"></div>';
        player += '              </div>';
        player += '          </div>';
        player += '     </div>';
        player += ' </div>';
        return player;
    },
    //初始化总时间，当前时间
    /* _timeInit: function () {
     document.querySelector(".time-duration").innerHTML = getTime(this.audio.duration);
     document.querySelector(".time-current").innerHTML = getTime(this.audio.currentTime);
     function getTime(attr){
     var Time, minutes, seconds;
     minutes = parseInt(attr / 60);
     seconds = parseInt(attr % 60);
     //1.确定秒数，小于10s需要补零
     seconds = seconds > 9 ? seconds : '0' + seconds;
     //2.确定分数，小于10分需要补零
     minutes = minutes > 9 ? minutes : '0' + minutes;
     Time = minutes + ':' + seconds;
     return  Time;
     }
     },*/
    _getTime: function (attr) {
        var Time, minutes, seconds;
        minutes = parseInt(attr / 60);
        seconds = parseInt(attr % 60);
        //1.确定秒数，小于10s需要补零
        seconds = seconds > 9 ? seconds : '0' + seconds;
        //2.确定分数，小于10分需要补零
        minutes = minutes > 9 ? minutes : '0' + minutes;
        Time = minutes + ':' + seconds;
        return Time;
    },
    //初始化总时间
    _totalTimeInit: function () {
        document.querySelector(".time-duration").innerHTML = this._getTime(this.audio.duration);
    },
    //更新当前时间
    _updateCurrentTime: function () {
        document.querySelector(".time-current").innerHTML = this._getTime(this.audio.currentTime);
    },
    //通过参数获得改变总时长
    updataTimeBy:function(duration){
        document.querySelector(".time-duration").innerHTML = this._getTime(duration);
    },
    //更新进度条
    _updateProgress: function () {
        //获取当前进度的百分数
        var progressVal;
        progressVal = this.audio.currentTime / this.audio.duration * 100 + '%';
        document.querySelector('.bar-played').style.width = progressVal;

    },
    //定义一个定时器，用来刷新进度条和当前时间
    _update: function () {
        var that = this;
        var timer;
        timer = setInterval(function () {
            if (that.audio.paused) {
                clearInterval(timer);
            }
            else if (that.audio.currentTime < that.audio.duration) {
                that._updateCurrentTime();
                that._updateProgress();
            } else if (that.audio.currentTime == that.audio.duration){
                //播放结束 归零 可以播放状态
            }
        }, 200);
    },
    //播放和暂停，通过改变组件主容器的类名，改变播/暂停样式
    _playPause: function () {
        var that = this;
        var prop1 = 'audioPlayer';
        var prop2 = 'audioPlayer audioPlayer-playing';

        if (that.audio.paused) {
            that.audio.play();
            document.querySelector(".audioPlayer").className = prop2;

            // console.log(document.querySelector(".audioPlayer").className);
        } else if (that.audio.play) {
            that.audio.pause();
            document.querySelector(".audioPlayer").className = prop1;
            // console.log(document.querySelector(".audioPlayer").className);          
        } else if(that.audio.readyState != 4){
            console.log(that.audio.readyState);
            //that.audio.currentTime = that.audio.buffered.end(that.audio.buffered.length - 1);
            that.audio.load();
            that.audio.pause();
        }
    },
    //给组件元素绑定事件
    bindEvent: function () {
        var that = this;
        //1.播放暂停事件
        this.on('.playpause', 'click', function () {
            that._playPause();
            that._totalTimeInit();
            that._update();
        });
        //静音切换        
        this.on('.volume-button', 'click', function () {
            // that.audio.muted = !that.audio.muted;
            //如果不是静音状态
            if (!that.audio.muted) {
                // console.log('开始静音');
                that.audio.muted = true;
                document.querySelector('.volume-value').style.width = "0";
                //button改为静音的样式
                document.querySelector('.volume-button').className = 'volume-button off';
            }
            //静音状态下
            else if (that.audio.muted) {
                // console.log('关闭静音');
                that.audio.muted = false;
                document.querySelector('.volume-value').style.width = "100%";
                //button样式回复
                document.querySelector('.volume-button').className = 'volume-button';
            }
        });
        //进度条点击事件
        this.on('.bar', 'click', function (e) {
            var player = that.audio;
            //没有加载不能播放
            if (player.readyState !== 0) {
                // console.log(e.layerX);
                // console.log(document.querySelector('.bar').offsetWidth);
                // 获取鼠标点击的相对x坐标计算百分比
                var x, W, per, playTime;
                //console.log(e.layerX);
                //console.log(e.offsetX);
                //x = e.layerX;
                x = e.offsetX;
                W = document.querySelector('.bar').offsetWidth;
                per = x / W;
                playTime = parseInt(player.duration * per);
                // console.log(11);
                document.querySelector('.bar-played').style.width = per * 100 + '%';
                /*//这里的音频一般都能瞬间缓冲结束，所以直接赋值
                 player.currentTime = playTime;*/
                //如果拖动到的时间在缓冲时间范围内
                if (player.fateSeek) {
                    console.log(11);
                    player.fateSeek(playTime)
                } else if (playTime < player.seekable.end(0) && playTime > player.seekable.start(0)) {
                    player.currentTime = playTime;
                } else {
                    //缓冲的最大时间小于当前拖拽处的时间，且不在audio.seekable的范围,回到缓冲的最大位置处
                    player.currentTime = player.buffered.end(player.buffered.length - 1);
                }
                //拖动结束后更新时间

                that._totalTimeInit();
                document.querySelector(".time-current").innerHTML = that._getTime(playTime);
                if(that.audio.paused){
                    that._playPause();
                    that._update();
                }


            }else if(that.audio.readyState != 4){
                console.log(that.audio.readyState);
                //that.audio.currentTime = that.audio.buffered.end(that.audio.buffered.length - 1);
                that.audio.load();
                that.audio.pause();
            } else {
                return;
            }

        });
        //音量条点击事件
        this.on('.volume-max', 'click', function (e) {
            console.log(12345);
            var player, y, H, per;
            player = that.audio;
            //获取相对y坐标
            console.log(e.layerY);
            console.log(e.offsetY);
            //y = e.layerY; ==>改变滚动条高度会相对于原先位置的y值
            y = e.offsetY;
            //默认样式height为80%父盒子高度
            H = document.querySelector('.volume-adjust').offsetHeight * 0.8;
            //y的值越大，声音越小
            per = Math.abs(H - y) / H;

            // 设置了volume和音量条高度的双向绑定
            that.volume = per;
            //改变媒体音量
            player.volume = per;
        });

    },
    /*绑定方法*/
    on: function (selector, type, fn) {
        /*判断出入的是string还是dom元素*/
        var dom = selector.constructor === String ? document.querySelector(selector) : selector;
        /*兼容问题*/
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent('on' + type, fn); //ie6兼容方法
        }
    }
};
