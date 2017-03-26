var Player = function(option) {
    this.init(option);
};
Player.prototype = {
    init: function(option) {
        //绑定容器和audio
        this.container = option.container.constructor === String ? document.getElementById(option.container) : option.container;
        this.audio = option.audio.constructor === String ? document.getElementById(option.audio) : option.audio;
        //播放列表
        this.storage = window.localStorage;
        this.list = this.storage['myPlayList']?JSON.parse(this.storage['myPlayList']) : [];
       /* this.list = [/!*{
            'id': 0,
            'songId': ,
            'name': "你就不要想起我 (Live) (原唱：田馥甄)",
            'src': "http://ws.stream.qqmusic.qq.com/201040845.m4a?fromtag=46"
        }*!/];*/
        //定义一个列表标记
        this.index = 0;
        //定义一个当前暂停时间的标记，暂停时获取当时时间，切换歌曲后归零
        this.time_pause = 0;
        //定义一个标记，判断当前资源是否加载过
        this.b = true;

        this.bindDom();
        this.next = document.getElementById("play_next"); //下一首
        this.prev = document.getElementById("play_prev"); //上一首
        this.playPause = document.getElementById("playPause"); //播放、暂停
        this.time_current = document.getElementById("time_current"); //当前时间
        this.time_progress_bar = document.getElementById("time_progress_bar"); //当前时间进度条
        this.time_progress = document.getElementById("time_progress"); //总计进度条
        this.time_total = document.getElementById("time_total"); //总计时间
        this.audio_title = document.getElementById("audio_title"); //当前歌曲名称
        this.btn_listbox = document.getElementById("btn_listbox"); //list按钮
        this.audio_list = document.getElementById("audio_list"); //播放列表
        this.volume_adjust = document.getElementById("volume_adjust"); //音量按钮
        this.icon_volume = document.getElementById("icon_volume"); //音量按钮图标
        this.vol_bar = document.getElementById("vol_bar"); //音量条
        this.vol_mask = document.getElementById("vol_mask"); //音量条对比容器


        this.bindEvent();
        //绑定音量
        Object.defineProperty(this, 'volume', {
            get: function() {
                return this.vol_bar.style.height;
            },
            set: function(val) {
                if (val >= 0 && val <= 1)
                    this.vol_bar.style.height = val * 100 + '%';
            }
        });
        //绑定进度条
        Object.defineProperty(this, 'progress', {
            get: function() {
                return this.time_progress_bar.style.width;
            },
            set: function(val) {
                if (val >= 0 && val <= 1)
                    this.time_progress_bar.style.width = val * 100 + '%';
            }
        });
    },
    doms: function() {
        var player = ''
        player += ' <div id="audioPlayer">';
        player += '    <div class="btns">';
        player += '        <button id="play_prev" class="prev icon-prev"></button>';
        player += '        <button id="playPause" class="playPause icon-play"></button>';
        player += '        <button id="play_next" class="next icon-next"></button>';
        player += '    </div>';
        player += '    <div class="content">';
        player += '        <span id="time_current">00:00</span>';
        player += '        <div class="bar_container">';
        player += '            <span id="audio_title" title="歌曲名称">歌曲名称</span>';
        player += '            <div id="time_progress">';
        player += '                <div id="time_progress_bar" style="width: 0;">';
        player += '                </div>';
        player += '            </div>';
        player += '        </div>';
        player += '        <span id="time_total">00:00</span>';
        player += '    </div>';
        player += '    <div class="listbox">';
        player += '        <button id="btn_listbox" title="列表"><span class="icon-folder"></span></button>';
        player += '        <div id="audio_list">';
        player += '            <ol>';
        player += '            </ol>';
        player += '            <div class="scroll">';
        player += '                 <div class= "bar">';
        player += '                 </div>';
        player += '            </div>';
        player += '        </div>';
        player += '    </div>';
        player += '    <div class="volume">';
        player += '        <button id="volume_adjust">';
        player += '            <span id="icon_volume" class="icon-volume-up"></span>';
        player += '        </button>';
        player += '        <div class="volume_progress">';
        player += '            <div  class="progress_col">';
        player += '                 <div id="vol_mask"></div>';
        player += '                <div id="vol_bar" class="progress_bar_col" style="height:50%"></div>';
        player += '            </div>';
        player += '        </div>';
        player += '    </div>';
        player += ' </div>';

        return player;
    },
    save:function(){
        this.storage['myPlayList'] = JSON.stringify(this.list);
    }
    ,
    //播放所产生的事件
    trigger:function(){
        //记录下暂停的时间
        this.time_pause = this.audio.currentTime !== 0 ? this.audio.currentTime : this.time_pause;
        //进行播放或暂停
        this.playAndPause();
        //更新时间和进度条
        this.updateTime();
    }
    ,
    bindDom: function() {
        this.container.innerHTML = this.doms();
    },
    bindEvent: function() {
        var that = this;
        //绑定播放暂停
        this.on(this.playPause, 'click', function() {
            that.trigger();
            //记录下暂停的时间
            /*that.time_pause = that.audio.currentTime !== 0 ? that.audio.currentTime : that.time_pause;
            that.playAndPause();
            that.updateTime();*/
        });
        //绑定下一首
        this.on(this.next, 'click', function() {
            that.playNext();
        });
        //绑定上一首
        this.on(this.prev, 'click', function() {
            that.playPrev();
        });
        //显示隐藏播放列表
        this.on(this.btn_listbox, 'click', function() {
            that.listShowOrHide();
            if (this.children[0].className == 'icon-folder') {
                this.children[0].className = 'icon-folder-open'
            } else {
                this.children[0].className = 'icon-folder'
            }

        });
        //静音切换
        this.on(this.icon_volume, 'click', function() {
            that.volumeOffOrUp();
        });
        //进度条拖动
        this.on(this.time_progress, 'click', function(e) {
            that.adjustProgress(e);
        });
        //音量条拖动
        this.on(this.vol_mask, 'click', function(e) {
            that.adjustVol(e);
        });
        //播放列表点击事件
        this.on(this.audio_list.children[0], 'click', function(event) {
            var event = event || window.event;
            var target = event.target || event.srcElement;
            // console.log(target);
            // console.log(target.parentNode);
            if (target.nodeName.toUpperCase() == 'A') {
                // console.log(target.className);
                that.playIndex(target.parentNode.id);
                that.barMove(target.parentNode.id);
            }
            //删除列表某一项
            else if (target.nodeName.toUpperCase() == 'SPAN') {
                that.delList(target.parentNode.id);
                that.save();
            }

        });


    },
    /*绑定方法*/
    on: function(dom, type, fn) {
        /*兼容问题*/
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent('on' + type, fn); //ie兼容方法
        }
    },
    //返回播放列别当前项信息
    getItem: function() {
        if (!this.list.length) {
            return;
        } else {
            return this.list[this.index];
        }
    },
    //加载新资源是执行该方法
    loadNewSrc: function() {
        this.time_pause = 0;
        this.b = true;

    },
    //播放和暂停事件
    playAndPause: function(flag) {
        // console.log('当前暂停时间：' + this.time_pause);
        var flag = flag | this.audio.paused,
            item = this.getItem();
        // this.upDateList();
        if(!this.list.length){
            return;
        }
        if (this.b) {
            // console.log('该资源第一次加载');
            //加载数据    
            this.audio.src = item.src;
            this.audio_title.innerHTML = item.name;
            this.audio_title.title = item.name;
            this.upDateList();
            this.b = false;
        } else {
            // console.log('该资源已加载过');
        }

        if (flag) {
            //从记录的暂停时间开始播放
            this.audio.currentTime = this.time_pause;
            this.playPause.className = 'icon-pause';
            this.audio.play();

        } else {
            this.playPause.className = 'icon-play';
            this.audio.pause();


        }
    },
    //下一首
    playNext: function() {
        this.loadNewSrc();
        this.index++;
        if (this.index == this.list.length)
            this.index = 0;
        this.playAndPause(true);
        this.updateTime();

    },
    //上一首
    playPrev: function() {
        this.loadNewSrc();
        this.index--;
        if (this.index == -1)
            this.index = this.list.length - 1;
        this.playAndPause(true);
        this.updateTime();
    },
    //播放列表中指定的项
    playIndex: function(id) {
        // console.log('需要跳转的id是' + id);
        //根据参数找到指定的index
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                // console.log("找到了");
                this.loadNewSrc();
                this.index = i;
                this.playAndPause(true);
                this.updateTime();
                return;
            }
        }
    },
    //播放列表显示隐藏
    listShowOrHide: function() {
        if (this.audio_list.className === 'show') {
            this.audio_list.className = '';
        } else {
            this.audio_list.className = 'show';
        }
    },
    //静音切换,更改音量条宽度
    volumeOffOrUp: function() {
        // this.audio.muted = this.audio.muted ? false : true;
        if (this.audio.muted) {
            this.audio.muted = false;
            this.vol_bar.style.width = '100%';
            this.icon_volume.className = 'icon-volume-up';
        } else {
            this.audio.muted = true;
            this.vol_bar.style.width = 0;
            this.icon_volume.className = 'icon-volume-off';
        }
    },
    //时间格式转换
    timeTrans: function(time) {
        var Time, minutes, seconds;
        minutes = parseInt(time / 60);
        seconds = parseInt(time % 60);
        //1.确定秒数，小于10s需要补零
        seconds = seconds > 9 ? seconds : '0' + seconds;
        //2.确定分数，小于10分需要补零
        minutes = minutes > 9 ? minutes : '0' + minutes;
        Time = minutes + ':' + seconds;
        return Time;
    },
    //更新时间
    updateTime: function() {
        var that = this,
            player = that.audio,
            timer;
        if (!that.audio.src) {
            return;
        } else {
            timer = setInterval(function() {
                if (that.audio.ended) {
                    //播放结束，记录的暂停事件归零
                    that.loadNewSrc();
                    clearInterval(timer);
                    that.playNext();
                    that.updateTime();
                } else if (that.audio.paused) {
                    clearInterval(timer);
                } else {
                    that.time_current.innerText = that.timeTrans(player.currentTime) || "00:00";
                    that.time_total.innerText = that.timeTrans(player.duration) || "00:00";
                    that.progress = player.currentTime / player.duration;
                }

            }, 200);
        }
    },
    //进度条拖动
    adjustProgress: function(e) {
        var x, W, per, player, playTime;
        player = this.audio;
        //音频没有就绪
        if (player.readyState == 0) {
            return;
        }
        //x为鼠标点击的相对x坐标，W为容器总宽度
        x = e.offsetX;
        W = this.time_progress.offsetWidth;
        per = x / W;
        playTime = parseInt(player.duration * per);
        this.progress = per;
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
    },
    //拖动音量条
    adjustVol: function(e) {
        var y, H, per, player, per;
        player = this.audio;
        //y为鼠标点击的相对y坐标，H为容器总宽度
        y = e.offsetY;
        H = this.vol_mask.offsetHeight;
        per = (H - y) / H;
        this.volume = per;
        player.volume = per;
    },
    //播放列表同步
    upDateList: function() {
        //获得ol
        var list_ol = this.audio_list.children[0];
        var lis = '';
        //如果当前list为空
        if (!this.list.length) {
            list_ol.innerHTML = '';
            return;
        }
        //遍历，将name添加到li中并将元素追加到ol中
        for (var i = 0; i < this.list.length; i++) {
            if (i == this.index) {
                lis += '<li id="' + this.list[i].id + '" class="active" >';
                lis += '<a href="javascript:;" title="' + this.list[i].name + '">' + this.list[i].name + '</a><span>×</span></li>';
            } else {
                lis += '<li id="' + this.list[i].id + '" >';
                lis += '<a href="javascript:;" title="' + this.list[i].name + '">' + this.list[i].name + '</a><span>×</span></li>';
            }

        }
        list_ol.innerHTML = lis;
        this.barMove(this.list[this.index].id);

    },
    //删除指定的列表项
    delList: function(id) {
        //思路
        //1、列表中是否只有一项
        //是：停止播放，清空列表（this.list和ol都为空）

        if (this.list.length == 1) {
            //暂停
            this.audio.pause();
            this.playPause.className = 'icon-play';
            //当前时间为0
            this.audio.currentTime = 0;
            this.time_current.innerText = "00:00";
            //进度条为0
            this.progress = 0;
            //总计时间为0
            this.time_total.innerText = "00:00";
            //标题清空
            this.audio_title.innerText = '歌曲名称';
            //清空列表
            this.list = [];
            this.upDateList();
        }
        //否
        //2、删除列表中对应id的项，更新列表，
        else {
            //删除的是当前播放项
            if (id == this.list[this.index].id) {
                // console.log('删除的是当前播放项');
                this.playNext();
            } else {
                //继续播放
                // console.log('继续播发');
            }
            //剔除删除项
            var arr = [],
                index = 0;
            for (var i = 0; i < this.list.length; i++) {
                //找到被删除项，记录下其在数组中的下标(若果是最后一项，则-1)
                if (id == this.list[i].id) {
                    index = i < this.list.length - 1 ? i : 0;
                } else {
                    arr.push(this.list[i]);
                }
            }
            //重新赋值this.list和this.index
            this.list = arr;
            this.index = index;
            this.upDateList();
        }
    },
    //滑块移动事件
    barMove: function(id) {
        // console.log(this.list[this.index].id);
        if (this.audio_list.children[0].innerHTML.replace(/(^\s*)|(\s*$)/g, '') == '') {
            return;
        }
        //获取播放中的li
        var li = document.getElementById(id);
        //获取当前li的相对ul的y方向的位移
        var liTop = li.offsetTop;
        //console.log('当前项距离顶部高度'+liTop);
        //获取li自身的高度
        var liH = li.offsetHeight;
        // 获取列表容器
        var list = this.audio_list;
        //获取列表容器的展示的高度
        var listH = list.offsetHeight;
        //console.log('容器展示高度'+listH);
        //获取列表容器的总计的高度（包括滚动条部分）
        var listSH = list.scrollHeight;
        //console.log('容器总高度'+listSH);
        //liTop大于50%高度就可以发生改变
        if (liTop > listH * 0.5) {
            //保持当前li在从下往上数的第三个的位置
            //已经是倒数三个后滚动条已经到底，卷去了最大高度
            list.scrollTop = liH * 3 + liTop - listH > listSH - listH ? listSH - listH : liH * 3 + liTop - listH;
        } else {
            //前几个就不用卷滚动条
            list.scrollTop = 0;
        }
         //console.log('卷去的高度'+list.scrollTop);
    }
};
