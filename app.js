
define(['jquery', 'useImgPreload','gameCountDown','request', 'map','preload'], function ($, useImgPreload, gameCountDown, request, map,preload) {
  //map.map()
  //自定义数据流
  var MEDcountDownData={
      "1":{
        "clickedAudioSrc":{
          "element01":"http://live.babyfs.cn/web/H5/xl/template/2017/9/MED1/audio/baby.mp3",
          "element02":"http://live.babyfs.cn/web/H5/xl/template/2017/9/MED1/audio/peekaboo.mp3",
          "element03":"http://live.babyfs.cn/web/H5/xl/template/2017/9/MED1/audio/see.mp3"
        },
        "beforeClickedImgSrc": {
          "element01":"https://t.babyfs.cn/test/common/xl-img/PP/baby.png",
          "element02":"https://t.babyfs.cn/test/common/xl-img/PP/peekaboo.png",
          "element03":"https://t.babyfs.cn/test/common/xl-img/PP/see.png"
        }
      },
      "public":{
        "gameTimes":1
      }
  };
  var RESPONSEDATA =MEDcountDownData;
  var staticState=[
      "https://s0.babyfs.cn/op/arch/1/256e2a824f1a4229a2911cb432507bc0/Cpp.mp3",
      "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/pp.mp3",
      "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3",
      "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/bubble.mp3",
      "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/hengping.png",
      "https://s0.babyfs.cn/op/arch/1/3133320aae864dbb815b744e5e98057f/game/bg.png"
  ];
  preload.mainGame(RESPONSEDATA,'',function(num2,theImages){
    //调用 图片预加载 的方法。
    theImages.concat(staticState)
    useImgPreload.preload(num2, theImages, function () {
      gameCountDown.countDownStart(RESPONSEDATA)
    })
  })

  /**
   * iframe通信得到的数据
   */
  window.addEventListener('message', function (event) {
    console.log(event.data)
    console.log('收到信息')
    if (event.data) {
      //mainGame(event.data)
      preload.mainGame(event.data,'',function(num2,theImages){
        //调用 图片预加载 的方法。
        theImages.concat(staticState)
        useImgPreload.preload(num2, theImages, function () {
          gameCountDown.countDownStart(event.data)
        })
      })
    } else {
      console.log('event.data 不存在')
    }
  });

  /**
   * callback
   */
  var callback = function (res) {
    //mainGame(res.data.parsed.data, res.data.entity.type)
    preload.mainGame(event.data,res.data.entity.type,function(num2,theImages){
      useImgPreload.preload(num2, theImages, function () {
        gameCountDown.countDownStart(res.data.parsed.data,res.data.entity.type)
      })
    })
  }

  /**
   *
   */
   // var baseUrl = 'http://192.168.0.5/api/evaluation/get_tem_ins'
  var baseUrl = 'https://m.babyfs.cn/api/evaluation/get_tem_ins'
  var reg = /\?tem_ins_id=/
  var str = String(window.location)
  if (reg.test(str)) {
    var index = str.match(reg).index
    var _getUrl = baseUrl + str.slice(index, str.length)
    request.fetchData(_getUrl, callback)
  }
});
