function VIEW_MEDIA_SWIPER(){new MinusSwiper({ID:$("#rvw-mnp .swiper-container")[0]})}var viewMedia={el:{mnp:"#rvw-mnp"},template:{mnp:'<div id="rvw-mnp"><div class="mnp-gallery"><div class="mnp-header"><button class="btn-close" aria-label="kapat"><svg class="icon icon-close"><use xlink:href="assets/images/sprite-map.svg#close"></use></svg></button></div><div class="mnp-content"></div></div>',swp:'<div class="swiper-container"><div class="swiper-wrapper">{{SLD}}</div><div class="swiper-controls swiper-theme-light"><div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide" aria-disabled="false"></div><div class="swiper-button-prev swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-disabled="true"></div></div></div></div>',sld:'<div class="swiper-slide">{{CNT}}</div>'},swiper:function(e){var i=this,t="";$(e+" button[data-image]").each(function(){src=$(this).attr("data-image"),t+=i.template.sld.replace("{{CNT}}",'<img src="'+src+'" />')}),$(i.el.mnp+" .mnp-content").html(i.template.swp.replace("{{SLD}}",t)),"undefined"!=typeof MinusSwiper?VIEW_MEDIA_SWIPER():(""==swiperJSPluginLoader.status&&swiperJSPluginLoader.init(),stage.addEventListener("CustomEvent",[{type:"SWIPERJS_IS_READY",handler:VIEW_MEDIA_SWIPER}]))},thumb:function(i){var t=this;utils.detectEl($(t.el.mnp)[0])||$("body").append(t.template.mnp),$(i+" button[data-image]").each(function(e){$(this).off("click").on("click",function(){t.swiper(i),t.open(),$(t.el.mnp+" .swiper-container")[0].focused(e),t.close("image")})}),$(i+" button[data-video]").off("click").on("click",function(){src=$(this).attr("data-video"),$(t.el.mnp+" .mnp-content").html('<video src="'+src+'" controls autoplay></video>'),t.open(),t.close("video")})},open:function(){$(this.el.mnp).addClass("activated"),$("body").addClass("ajx-mnp-ready")},close:function(e){var i=this;$(i.el.mnp+" .btn-close, #overlay").off("click").on("click",function(){$(i.el.mnp).removeClass("activated"),$("body").removeClass("ajx-mnp-ready"),"image"==e&&$(i.el.mnp+" .swiper-container")[0].destroy(),$(i.el.mnp+" .mnp-content").html("")})}};