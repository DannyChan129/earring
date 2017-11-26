define(['jquery', 'imgpreload'], function (jquery) {
	var preload = function (num, the_images,fn) {
		jQuery.imgpreload(the_images,{
				each: function(){
						var status = $(this).data('loaded')?'success':'error';
						if(status=="success"){
								++num;
								$("#lodingnum").html((num/the_images.length*100).toFixed(0)+"%");
						}
				},
				all: function(){
						$("#lodingnum").html("100%");
						setTimeout(function(){
								document.getElementById('loading').style.display = "none";
								$(".p-index").css("display","block");
								fn&&fn()
						}, 300)
				}
		})
	}
	return {
		preload: preload
	}
})

