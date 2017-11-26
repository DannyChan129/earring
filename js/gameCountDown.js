define(['setScreenHoriz', 'jquery', 'common','starts'], function(setScreenHoriz, jquery, common,starts) {
    window.timer = null;
    var countDownStart = function(responseData, type) {
        var countDownData = null;
        var pageNumber = 0;
        var test = null;

        //音频自动播放
        var bgAudio = document.getElementById('bgAudio');

        //实例化公用的方法--交互相关
        var utils = new common.Utils('home-page', responseData);

        //地图相关获取 qid type totalPage
        window.qid = utils.mapInterception();
        window.type = type;
        window.totalPage = responseData.public.gameTimes;

        //调用点击游戏封面，封面消失函数
        utils.cover()

        //调用检测用户横竖屏函数
        utils.detectionScreen(function() {
            //背景音乐自动播放
            common.autoPlayAudio(bgAudio, 'https://s0.babyfs.cn/op/arch/1/256e2a824f1a4229a2911cb432507bc0/Cpp.mp3')
            setTimeout(function() {
                Initialization()
                $('.horizontal-screen-prompt').hide()
            }, 800)
        },function(){
            $('.horizontal-screen-prompt').show()
        })

        //获取每一页数据的下标,并且提取数字
        var key = utils.pageIndex().join('').replace(/[^0-9]/g, '').split('');

        //截取路径字符串,判断当前是第几个游戏
        var xIndex = utils.urlSplice().xIndex;
        var xTotal = utils.urlSplice().xTotal;
        setTimeout(function(){
            $('.rule').show()
            $('.rule').attr("src", "https://s0.babyfs.cn/op/arch/1/3133320aae864dbb815b744e5e98057f/game/rule.png")
        },50)
        $('.rule').click(function() {
            $('.mack1').hide()
            audio.src='https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/pp.mp3';
            audio.play()
            bgAudio.src = 'https://s0.babyfs.cn/op/arch/1/256e2a824f1a4229a2911cb432507bc0/Cpp.mp3'
            bgAudio.play()
            $('.rule').unbind('click')
            $('.rule').hide()
        })

        function Initialization() {
            var strHtml = '\
              <img id="test1" data="testOne" style="top:10%;left:10%;">\
              <img id="test2" data="testTwo" style="top:15%;left:32%">\
              <img id="test3" data="testThree" style="top:52%;left:5%;">\
              <img id="test4" data="testFour" style="top:35%;left:72%;">\
              <img id="test5" data="testFive" style="top:56%;left:34%;">\
              <img id="test6" data="testSix" style="top:20%;left:53%;">\
           ';
            $('#box').html(strHtml)
            test = [test1, test2, test3, test4, test5, test6];
            countDownData = responseData[key[pageNumber]];

            ////////// 暂存游戏规则相关 不同页数不同的自定义分数值
            mapScore(window.type, countDownData)
            //////////

            $('#box').css("background-image", "url(https://s0.babyfs.cn/op/arch/1/3133320aae864dbb815b744e5e98057f/game/bg.png)");
            var aImgs = $('#box img');
            implement(test)
            clickImg(countDownData, aImgs)
        }

        function implement(test) {
            var beforeClickedImgSrc = common.objectKeys(countDownData.beforeClickedImgSrc).concat(common.objectKeys(countDownData.beforeClickedImgSrc));
            beforeClickedImgSrc.sort(function() {
                return Math.random() - 0.5;
            })
            for (var i = 0; i < test.length; i++) {
                (function(index){
                    test[index].src = beforeClickedImgSrc[i].value;
                    test[index].setAttribute('data-value', beforeClickedImgSrc[index].keys)
                    test[index].stepX = Math.floor(Math.random() * 10 - 5);
                    test[index].stepY = Math.floor(Math.random() * 10 - 5);
                    collisionMove({
                        obj: test[index]
                    })
                })(i)
                
            }
        }

        function clickImg(_data, obj) {
            var num = 0;
            for (var i = 0; i < obj.length; i++) {
                (function(index){
                    obj.eq(index).click(function() {
                        var aImg = document.querySelectorAll('#box img');
                        clearInterval(aImg[index].timer)
                        var dataVal = obj.eq(index).attr('data-value');
                        obj.eq(index).unbind('click')
                        $('.mack').show()
                        audio.src = _data.clickedAudioSrc[dataVal];
                        audio.play()
                        setTimeout(function() {
                            obj.eq(index).attr('class', 'hide')
                            audio.src = 'https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/bubble.mp3';
                            audio.play()

                            $('#audio').bind('ended', function() {
                                $('#audio').unbind('ended')
                                $('.mack').hide()
                                obj.eq(index).css('display', 'none')
                                num++;
                                if (num == 6) {
                                    // 点击了6次 该页游戏结束
                                    var gameTimes = responseData.public.gameTimes;
                                    ///////////////// 地图相关判断总页数是不是只有一页
                                    if (gameTimes == 1) {
                                        window.page = 1
                                    } else {
                                        window.page = pageNumber + 1
                                    }
                                    // 正确计数的赋值
                                    window.correctCount = 1
                                    //////////////////////////
                                    setTimeout(function() {
                                        if (pageNumber < gameTimes - 1) {
                                            pageNumber++;
                                            ///////////////// 判断如果是来自地图 游戏结束后传分
                                            if (window.qid) {
                                                submitScore(window.qid, window.type, window.page, window.totalPage, window.perScore, window.correctCount, window.totalScore)
                                            }
                                            ///////////////////////////
                                            Initialization()
                                        } else {
                                            $('.modalBox,.mack1').show()
                                            if (xIndex == xTotal) {
                                                setTimeout(function(){
                                                    audio.src = "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3";
                                                    audio.play();
                                                }, 500)
                                                //////////////// 判断如果是来自地图 游戏结束后传分
                                                if (window.qid) {
                                                    submitScore(window.qid, window.type, window.page, window.totalPage, window.perScore, window.correctCount, window.totalScore)
                                                }
                                            } else {
                                                var num = 2;           //0代表一个星星、1代表两个星星、2代表三个星星
                                                var gamePage = false;  //true代表最后一页并且是最后一个游戏，false代表是最后一页但不是最后一个游戏。
                                                setTimeout(function(){
                                                    audio.src = "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3";
                                                    audio.play();
                                                    window.starRating('modalBox',num,gamePage)
                                                    window.buttonClick()
                                                }, 500)
                                            }
                                        }
                                    }, 1000)
                                }
                            })
                            obj.eq(index).css({
                                "z-index": 5,
                                "opacity": 0
                            });
                        }, 2000)
                    })
                })(i)
            }
        }

        function collisionMove(json) {
            var obj = json.obj;
            var fn = json.fn;
            //声明x、y轴的当前值
            var curX, curY;
            //声明x、y轴方向
            var dirX = json.dirX;
            var dirY = json.dirY;
            dirX = obj.stepX > 0 ? '+' : '-';
            dirY = obj.stepY > 0 ? '+' : '-';
            //声明offset宽高
            var offsetWidth = obj.offsetWidth;
            var offsetHeight = obj.offsetHeight;
            //声明元素活动区域宽高
            var activeWidth = json.activeWidth;
            var activeHeight = json.activeHeight;
            //元素获取区域宽高默认值为可视区域宽高
            activeWidth = Number(activeWidth) || document.documentElement.clientWidth;
            activeHeight = Number(activeHeight) || document.documentElement.clientHeight;
            //声明left、top样式值
            var left, top;

            //开启定时器
            clearInterval(obj.timer)
            obj.timer = setInterval(function() {
                //获取x、y轴的当前值
                curX = parseFloat(getCSS(obj, 'left'));
                curY = parseFloat(getCSS(obj, 'top'));
                bump(test);
                //更新left、top值
                left = curX + obj.stepX;
                top = curY + obj.stepY;
                //右侧碰壁前一刻，步长大于剩余距离，且元素向右运动时
                if ((left > activeWidth - offsetWidth) && (dirX == '+')) {
                    left = activeWidth - offsetWidth;
                }
                //左侧碰壁前一刻，步长大于剩余距离，且元素向左运动时
                if ((Math.abs(obj.stepX) > curX) && (dirX == '-')) {
                    left = curX;
                }
                //下侧碰壁前一刻，步长大于剩余距离，且元素向下运动时
                if ((top > activeHeight - offsetHeight) && (dirY == '+')) {
                    top = activeHeight - offsetHeight;
                }
                //上侧碰壁前一刻，步长大于剩余距离，且元素向上运动时
                if ((Math.abs(obj.stepY) > curY) && (dirY == '-')) {
                    top = curY;
                }
                obj.style.left = left + 'px';
                obj.style.top = top + 'px';
                //左侧或右侧碰撞瞬间
                if (left == activeWidth - offsetWidth || left == curX) {
                    obj.stepX = -obj.stepX;
                }
                //上侧或下侧碰撞瞬间
                if (top == activeHeight - offsetHeight || top == curY) {
                    obj.stepY = -obj.stepY;
                }
                //更新运动方向
                dirX = obj.stepX > 0 ? '+' : '-';
                dirY = obj.stepY > 0 ? '+' : '-';
            }, 100);
        }

        //获取非行间样式
        function getCSS(obj, style) {
            if (window.getComputedStyle) {
                return getComputedStyle(obj)[style];
            }
            return obj.currentStyle[style];
        }

        //碰撞检测函数
        function bump(arr) {
            for (var i = 0; i < arr.length; i++) {
                /***动态元素***/
                arr[i].r = arr[i].offsetWidth / 2;
                arr[i].x0 = parseFloat(getCSS(arr[i], 'left')) + arr[i].r;
                arr[i].y0 = parseFloat(getCSS(arr[i], 'top')) + arr[i].r;
            }
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr.length; j++) {
                    //j++;
                    if (j != i) {
                        var number = Math.sqrt((arr[i].x0 - arr[j].x0) * (arr[i].x0 - arr[j].x0) + (arr[i].y0 - arr[j].y0) * (arr[i].y0 - arr[j].y0));
                        if (number <= arr[i].r + arr[j].r) {
                            var a = Math.atan(Math.abs((arr[i].y0 - arr[j].y0) / (arr[i].x0 - arr[j].x0)));
                            stepChange(arr[i], arr[j], a);
                            stepChange(arr[j], arr[i], a);
                        }
                    }
                }
            }
        }
        //碰撞时，步长变化函数
        function stepChange(obj, objOther, a) {
            //步长合并
            obj.step = Math.sqrt(obj.stepX * obj.stepX + obj.stepY * obj.stepY);
            //假设总步长方向与x轴方向的夹角为b
            obj.b = Math.atan(Math.abs(obj.stepY / obj.stepX));
            //假设总步长方向与碰撞方向的夹角为c
            obj.c = Math.abs(a - obj.b);
            //步长分解
            //碰撞方向
            obj.step1 = obj.step * Math.cos(obj.c);
            //垂直方向
            obj.step2 = obj.step * Math.sin(obj.c);
            //按照运动元素(侵入元素)的起始运动方向对步长进行重新分解
            //左上
            if (obj.x0 <= objOther.x0 && obj.y0 <= objOther.y0) {
                obj.stepX = -obj.step1 * Math.cos(a) + obj.step2 * Math.sin(a)
                obj.stepY = -obj.step1 * Math.sin(a) - obj.step2 * Math.cos(a)
            }
            //左下
            if (obj.x0 < objOther.x0 && obj.y0 > objOther.y0) {
                obj.stepX = -obj.step1 * Math.cos(a) + obj.step2 * Math.sin(a)
                obj.stepY = obj.step1 * Math.sin(a) + obj.step2 * Math.cos(a)
            }
            //右上
            if (obj.x0 > objOther.x0 && obj.y0 < objOther.y0) {
                obj.stepX = obj.step1 * Math.cos(a) - obj.step2 * Math.sin(a)
                obj.stepY = -obj.step1 * Math.sin(a) - obj.step2 * Math.cos(a)
            }
            //右下
            if (obj.x0 > objOther.x0 && obj.y0 > objOther.y0) {
                obj.stepX = obj.step1 * Math.cos(a) - obj.step2 * Math.sin(a)
                obj.stepY = obj.step1 * Math.sin(a) + obj.step2 * Math.cos(a)
            }
        }

        window.buttonClick = function(){
            //重来
            $('.again').click(function() {
                ////// 判断如果是来自地图 且是最后一道题
                if (window.qid && xIndex == xTotal) {
                    parent.replayAll()
                } else {
                    window.location.reload();
                    parent.replayThis()
                }
                //////////////
            })

            //下一页
            $('.next').click(function() {
                if (window.qid) {
                    // 判断如果是来自地图 游戏结束后传分
                    submitScore(window.qid, window.type, window.page, window.totalPage, window.perScore, window.correctCount, window.totalScore)
                } else {
                    // 是来自集训营课程 游戏结束后调用父方法进行下个游戏
                    parent.handleGoing(xIndex)
                }
            })

            //返回主页
            $('.home').click(function() {
                parent.location.reload()
            })
        }
    }
    return {
        countDownStart: countDownStart
    }
})
