define(['jquery', 'useImgPreload', ], function($, useImgPreload) {
    //封装随机数函数
    var ranDom = function(n, m) {
        return Math.floor(Math.random() * (m - n) + n);
    }

    //封装获取json数据里面key，value函数
    var objectKeys = function(obj) {
        var exam = Object.keys(obj).map(function(k) {
            return {
                value: obj[k],
                keys: k
            }
        })
        return exam;
    }

    //自动播放音频
    var autoPlayAudio = function(obj, data) {
        obj.src = data;
        wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            obj.play();
        });
    }

    //集训营地图相关方法
    var Utils = function(id, responseData) {
        //获取封面对象
        this.homePage = document.getElementById(id);

        //检测用户横竖屏
        this.WIDTH = document.documentElement.clientWidth;
        this.HEIGHT = document.documentElement.clientHeight;
        this.btnOff = true;

        //获取数据流
        this.data = responseData;

        //获取URL
        this.xUrl = String(window.location.href);
        this.xIndex = '';
        this.xTotal = '';

        //地图相关获取 qid type totalPage
        this.reg = /qid=/;
        this.str = String(window.location);
    }
    Utils.prototype = {
        //如果是第一个游戏点击封面，封面消失。
        cover: function() {
            this.homePage.addEventListener('click', function() {
                this.style.display = 'none';
            }, false)
        },

        //横竖拼检测
        detectionScreen: function(crossScreen,verticalScreen) {
            if (this.WIDTH < this.HEIGHT) {            
                verticalScreen&&verticalScreen()
            } else {              
                crossScreen && crossScreen()
            }
            window.addEventListener('orientationchange', function(event) {
                $('.horizontal-screen-prompt').hide()
                if (window.orientation == 180 || window.orientation == 0) {
                    verticalScreen&&verticalScreen()
                }
                if (window.orientation == 90 || window.orientation == -90) {
                    crossScreen && crossScreen()
                }
            });
        },

        //获取每一页数据下标
        pageIndex: function() {
            var key = [];
            for (var item in this.data) {
                key.push(item)
            }
            key.sort()
            return key;
        },

        //截取路径字符串
        urlSplice: function() {
            for (var i = 0; i < this.xUrl.split('&').length; i++) {
                if (this.xUrl.split('&')[i].split('=')[0] == 'index') {
                    this.xIndex = this.xUrl.split('&')[i].split('=')[1];
                }
                if (this.xUrl.split('&')[i].split('=')[0] == 'total') {
                    this.xTotal = this.xUrl.split('&')[i].split('=')[1];
                }
            }
            if (this.xIndex == 1) {
                this.homePage.style.display = 'block';
                if (!window.qid) {
                    this.homePage.style.backgroundImage = "url(" + parent.examPosterUrl + ")";
                }
            } else {
                this.homePage.style.display = 'none';
            }
            return {
                xIndex: this.xIndex,
                xTotal: this.xTotal
            }
        },

        //地图相关获取
        mapInterception: function() {
            if (this.reg.test(this.str)) {
                var index = this.str.match(this.reg).index;
                window.qid = this.str.slice((index + 4), this.str.length)
                return window.qid;
            }
        }
    }

    //公开对象
    return {
        ranDom: ranDom,
        objectKeys: objectKeys,
        autoPlayAudio: autoPlayAudio,
        Utils: Utils
    }
})
