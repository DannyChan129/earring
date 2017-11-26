
define(['request', 'map'], function(request, map) {
  var mainGame = function(_responseData,type,success){
    var arr=[],theImages=[],num2 = 0;
    function getVal(_responseData){
      for (var i in _responseData){
        if (typeof _responseData[i] == 'object') {
          getVal(_responseData[i])
        } else {
          arr.push(_responseData[i])
        }
      }
    }
    var staticState=[
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/home.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/Good.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/greatImg.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/KeepTrying.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/light.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/perfect.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/Perfect1.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/starts1.png",
      "https://s0.babyfs.cn/op/arch/1/3133320aae864dbb815b744e5e98057f/game/rule.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/btn_oncemore.png",
      "https://s0.babyfs.cn/op/arch/1/e83c9a9fef344dd591b7ab8627da968b/modalBox/btn_next.png"
    ];

    getVal(_responseData);
    for(var i=0;i<arr.length;i++){
      if(/.jpg$|.png$|.gif$|.mp3$/g.test(arr[i])){
        theImages.push(arr[i])
      }
    }
    var theImages=theImages.concat(staticState)

    //调用 图片预加载 的方法。
    success&&success(num2,theImages)
    
  }

  //公开对象
  return {
      mainGame: mainGame
  }
})