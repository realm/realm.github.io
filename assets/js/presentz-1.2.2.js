/*
Presentz - A web library to show synchronized video + slides presentations

Copyright (C) 2012 Federico Fissore

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function(){"use strict";var e,t,i,n,r,s,o,l,a,d,u,h,p,c,f,y,v=[].indexOf||function(e){for(var t=0,i=this.length;i>t;t++)if(t in this&&this[t]===e)return t;return-1},m=function(e,t){return function(){return e.apply(t,arguments)}},g={}.hasOwnProperty,w=function(e,t){function i(){this.constructor=e}for(var n in t)g.call(t,n)&&(e[n]=t[n]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e};c=function(){function e(e,t,i,n){this.presentz=e,this.videoContainer=t,this.width=i,this.height=n,this.handleEvent=m(this.handleEvent,this),this.onReady=m(this.onReady,this),this.video=new h(["play"],["pause"],["end"],this.presentz),this.elementId=this.presentz.newElementName()}var t;return t="//fast.wistia.com/assets/external/E-v1.js",e.prototype.ensureWistiaIframeAPILoaded=function(e){var i,n,r;0===jQuery('script[src="'+t+'"]').length?(r=document.createElement("script"),r.type="text/javascript",r.src=t,r.onload=e,i=jQuery("script"),0===i.length?jQuery(this.videoContainer)[0].appendChild(r):(n=i[0],n.parentNode.insertBefore(r,n))):e()},e.prototype.changeVideo=function(e,t){return this.wouldPlay=t,jQuery(this.videoContainer).append("<div id='wistia_"+this.videoId(e)+"' class='wistia_embed' style='width:"+this.width+"px;height:"+this.height+"px;'>&nbsp;</div>"),this.ensureWistiaIframeAPILoaded(function(t){return function(){var i;jQuery(t.videoContainer).append('<div id="'+t.elementId+'"></div>'),t.player=Wistia.embed(t.videoId(e),{videoFoam:!0}),t.player.bind("ready",function(){return this.onReady}),i=t.video,t.player.bind("play",function(){return i.handleEvent("play")}),t.player.bind("pause",function(){return i.handleEvent("pause")}),t.player.bind("end",function(){return i.handleEvent("end")})}}(this))},e.prototype.videoId=function(e){var t,i;return i=e.url.toLowerCase(),t=e.url,-1!==i.indexOf("wistia.com/")&&(t=t.substr(t.lastIndexOf("/")+1),-1!==t.indexOf("?")&&(t=t.substr(0,t.indexOf("?")))),t},e.prototype.onReady=function(){return this.wouldPlay?this.play():void 0},e.prototype.handleEvent=function(e){this.video.handleEvent(e.data)},e.prototype.handle=function(e){var t;return t=e.url.toLowerCase(),-1!==t.indexOf("wistia.com/")},e.prototype.currentTime=function(){var e;return null!=(null!=(e=this.player)?e.time:void 0)?this.player.time():0},e.prototype.skipTo=function(e,t){var i;return null==t&&(t=!1),null!=(null!=(i=this.player)?i.time:void 0)?((t||this.isPaused())&&this.player.time(e),t&&this.play(),!0):!1},e.prototype.play=function(){return this.player.play()},e.prototype.pause=function(){return this.player.pause()},e.prototype.isPaused=function(){return this.video.isInPauseState},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.WistiaPlugin=c,h=function(){function e(e,t,i,n){this.playStates=e,this.pauseStates=t,this.finishStates=i,this.presentz=n,this.isInPauseState=!0}return e.prototype.handleEvent=function(e){var t,i,n,r;if(this.isInPlayState=v.call(this.playStates,e)>=0,this.isInPauseState=v.call(this.pauseStates,e)>=0||!this.isInPlayState,this.isInFinishState=v.call(this.finishStates,e)>=0,this.isInPlayState?(this.presentz.startTimeChecker(),i=this.presentz.listeners.play):(this.isInPauseState||this.isInFinishState)&&(this.presentz.stopTimeChecker(),this.isInPauseState?i=this.presentz.listeners.pause:this.isInFinishState&&(i=this.presentz.listeners.finish)),null!=i)for(n=0,r=i.length;r>n;n++)(t=i[n])();this.isInFinishState&&this.presentz.currentChapterIndex<this.presentz.presentation.chapters.length-1&&this.presentz.changeChapter(this.presentz.currentChapterIndex+1,0,!0)},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.Video=h,t=function(){function e(e,t,i,n){this.presentz=e,this.videoContainer=t,this.width=i,this.height=n,this.video=new h(["play"],["pause"],["ended"],this.presentz),this.elementId=this.presentz.newElementName()}return e.prototype.handle=function(){return!0},e.prototype.changeVideo=function(e,t){var i,n,r=this;this.wouldPlay=t,i=jQuery(this.videoContainer),i.empty(),i.append('<video id="'+this.elementId+'" controls preload="none" src="'+e.url+'" width="100%" height="100%"></video>'),n={timerRate:500,success:function(e){r.onPlayerLoaded(e)}},new MediaElementPlayer("#"+this.elementId,n)},e.prototype.onPlayerLoaded=function(e){var t,i=this;this.player=e,t=function(e){i.video.handleEvent(e.type)},this.player.addEventListener("play",t,!1),this.player.addEventListener("pause",t,!1),this.player.addEventListener("ended",t,!1),this.player.load(),this.wouldPlay&&this.play()},e.prototype.currentTime=function(){return this.player.currentTime},e.prototype.skipTo=function(e,t){return null==t&&(t=!1),null!=this.player&&this.player.currentTime>0&&(this.player.setCurrentTime(e),t&&this.play()),!1},e.prototype.play=function(){return this.player.play()},e.prototype.pause=function(){return this.player.pause()},e.prototype.isPaused=function(){return this.video.isInPauseState},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.Html5Video=t,p=function(){function e(e,t,i,n){this.presentz=e,this.videoContainer=t,this.width=i,this.height=n,this.receiveVideoInfo=m(this.receiveVideoInfo,this),this.video=new h(["play"],["pause"],["finish"],this.presentz),this.wouldPlay=!1,this.currentTimeInSeconds=0,this.vimeoCallbackFunctionName=this.presentz.newElementName("callback"),"undefined"!=typeof window&&null!==window&&(window[this.vimeoCallbackFunctionName]=this.receiveVideoInfo),this.elementId=this.presentz.newElementName()}return e.prototype.changeVideo=function(e,t){var i;this.videoData=e,this.wouldPlay=t,i={url:"https://vimeo.com/api/v2/video/"+this.videoId(this.videoData)+".json",dataType:"jsonp",jsonpCallback:this.vimeoCallbackFunctionName},jQuery.ajax(i)},e.prototype.videoId=function(e){var t;return t=e.url,t=t.substr(t.lastIndexOf("/")+1),-1!==t.indexOf("?")&&(t=t.substr(0,t.indexOf("?"))),t},e.prototype.receiveVideoInfo=function(){var e,t,i,n,r=this;t="https://player.vimeo.com/video/"+this.videoId(this.videoData)+"?api=1&player_id="+this.elementId,0===jQuery("#"+this.elementId).length?(n='<iframe id="'+this.elementId+'" src="'+t+'" width="'+this.width+'" height="'+this.height+'" frameborder="0"></iframe>',jQuery(this.videoContainer).append(n),e=jQuery("#"+this.elementId)[0],i=function(e){r.onReady(e)},$f(e).addEvent("ready",i)):(e=jQuery("#"+this.elementId)[0],e.src=t)},e.prototype.handle=function(e){return-1!==e.url.toLowerCase().indexOf("//vimeo.com/")},e.prototype.onReady=function(e){var t=this;this.player=$f(e),this.player.addEvent("play",function(){t.video.handleEvent("play")}),this.player.addEvent("pause",function(){t.video.handleEvent("pause")}),this.player.addEvent("finish",function(){t.video.handleEvent("finish")}),this.player.addEvent("playProgress",function(e){t.currentTimeInSeconds=e.seconds}),this.player.addEvent("loadProgress",function(e){t.loadedTimeInSeconds=parseInt(parseFloat(e.duration)*parseFloat(e.percent))}),this.wouldPlay&&(this.wouldPlay=!1,this.play())},e.prototype.currentTime=function(){return this.currentTimeInSeconds},e.prototype.skipTo=function(e,t){return null==t&&(t=!1),this.player.api("seekTo",e+2),t&&this.play(),!0},e.prototype.play=function(){return this.player.api("play")},e.prototype.pause=function(){return this.player.api("pause")},e.prototype.isPaused=function(){return this.video.isInPauseState},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.Vimeo=p,f=function(){function e(e,t,i,n){this.presentz=e,this.videoContainer=t,this.width=i,this.height=n,this.handleEvent=m(this.handleEvent,this),this.onReady=m(this.onReady,this),this.video=new h([1],[-1,2],[0],this.presentz),this.elementId=this.presentz.newElementName()}var t;return t="//www.youtube.com/iframe_api",e.prototype.ensureYoutubeIframeAPILoaded=function(e){var i,n,r;0===jQuery('script[src="'+t+'"]').length?(r=document.createElement("script"),r.type="text/javascript",r.async=!0,r.src=t,i=jQuery("script"),0===i.length?jQuery(this.videoContainer)[0].appendChild(r):(n=i[0],n.parentNode.insertBefore(r,n)),window.onYouTubeIframeAPIReady=function(){return e()}):e()},e.prototype.changeVideo=function(e,t){var i=this;this.wouldPlay=t,this.ensureYoutubeIframeAPILoaded(function(){0===jQuery("#"+i.elementId).length?(jQuery(i.videoContainer).append('<div id="'+i.elementId+'"></div>'),i.player=new YT.Player(i.elementId,{height:i.height,width:i.width,videoId:i.videoId(e),playerVars:{rel:0,wmode:"opaque",cc_load_policy:1,showinfo:0,modestbranding:!0},events:{onReady:i.onReady,onStateChange:i.handleEvent}})):i.player.cueVideoById(i.videoId(e))})},e.prototype.videoId=function(e){var t,i;return i=e.url.toLowerCase(),t=e.url,-1!==i.indexOf("//youtu.be/")?(t=t.substr(t.lastIndexOf("/")+1),-1!==t.indexOf("?")&&(t=t.substr(0,t.indexOf("?")))):-1===i.indexOf("//youtube.com/")&&-1===i.indexOf("//www.youtube.com/")||(t=t.substr(t.indexOf("v=")+2),-1!==t.indexOf("&")&&(t=t.substr(0,t.indexOf("&")))),t},e.prototype.onReady=function(){return this.wouldPlay?this.play():void 0},e.prototype.handleEvent=function(e){this.video.handleEvent(e.data)},e.prototype.handle=function(e){var t;return t=e.url.toLowerCase(),-1!==t.indexOf("//youtu.be/")||-1!==t.indexOf("//youtube.com/")||-1!==t.indexOf("//www.youtube.com/")},e.prototype.currentTime=function(){var e;return null!=(null!=(e=this.player)?e.getCurrentTime:void 0)?this.player.getCurrentTime():0},e.prototype.skipTo=function(e,t){var i;return null==t&&(t=!1),null!=(null!=(i=this.player)?i.seekTo:void 0)&&((t||this.isPaused())&&this.player.seekTo(e,!0),t&&this.play()),!1},e.prototype.play=function(){return this.player.playVideo()},e.prototype.pause=function(){return this.player.pauseVideo()},e.prototype.isPaused=function(){return this.video.isInPauseState},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.Youtube=f,e=function(){function e(e,i,n,r){this.presentz=e,this.video=new t(this.presentz,i,n,r)}return e.prototype.changeVideo=function(e,t){var i;this.wouldPlay=t,i={url:e.url,dataType:"jsonp",data:"skin=json",jsonpCallback:"presentz.videoPlugin.receiveVideoInfo"},jQuery.ajax(i)},e.prototype.receiveVideoInfo=function(e){var t;t={url:e[0].Post.media.url},this.video.changeVideo(t,this.wouldPlay),this.player=this.video.player,this.skipTo=this.video.skipTo},e.prototype.handle=function(e){return-1!==e.url.toLowerCase().indexOf("http://blip.tv")},e.prototype.currentTime=function(){return this.video.currentTime()},e.prototype.skipTo=function(e,t){return null==t&&(t=!1),this.video.skipTo(e,t)},e.prototype.play=function(){return this.video.play()},e.prototype.pause=function(){return this.video.pause()},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.BlipTv=e,n=function(){function e(e,t){this.presentz=e,this.slideContainer=t,this.preloadedSlides=[]}return e.prototype.handle=function(e){return null!=e.url},e.prototype.changeSlide=function(e){var t,i;t=jQuery(""+this.slideContainer+" img"),0===t.length?(i=jQuery(this.slideContainer),i.empty(),i.append('<img src="'+e.url+'"/>')):t.attr("src",e.url)},e.prototype.preload=function(e){var t,i;i=e.url,v.call(this.preloadedSlides,i)>=0||(t=new Image,t.src=e.url,this.preloadedSlides.push(e.url))},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.ImgSlide=n,l=function(){function e(e,t,i,n){this.presentz=e,this.slideContainer=t,this.width=i,this.height=n,this.currentSlide=0,this.elementId=this.presentz.newElementName(),this.swfId=this.presentz.newElementName()}return e.prototype.handle=function(e){return null==e.url?!1:-1!==e.url.toLowerCase().indexOf("slideshare.net")},e.prototype.slideId=function(e){return e.url.substr(e.url.lastIndexOf("/")+1,e.url.lastIndexOf("#")-1-e.url.lastIndexOf("/"))},e.prototype.slideNumber=function(e){return parseInt(e.url.substr(e.url.lastIndexOf("#")+1))},e.prototype.changeSlide=function(e){var t,i,n,r,s,o,l,a,d;i=jQuery("#"+this.swfId),0===i.length?(t=jQuery(this.slideContainer),t.empty(),t.append('<div id="'+this.elementId+'"></div>'),s=this.slideId(e),a={allowScriptAccess:"always",wmode:"opaque"},n={id:this.swfId},o={doc:s,rel:0},swfobject.embedSWF("http://static.slidesharecdn.com/swf/ssplayer2.swf",this.elementId,this.width,this.height,"8",null,o,a,n),this.currentSlide=0):(d=i[0],l=this.slideNumber(e),null!=d.getCurrentSlide&&(r=d.getCurrentSlide(),l===r+1?d.next():(d.jumpTo(this.slideNumber(e)),this.currentSlide=d.getCurrentSlide())))},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.SlideShare=l,a=function(){function e(e,t){this.presentz=e,this.slideContainer=t,this.elementId=this.presentz.newElementName(),this.preloadedSlides=[],this.slideInfo={}}return e.prototype.handle=function(e){return null==e.url?!1:-1!==e.url.toLowerCase().indexOf("slideshare.net")&&null!=e.public_url},e.prototype.slideNumber=function(e){return parseInt(e.url.substr(e.url.lastIndexOf("#")+1))},e.prototype.ensureSlideInfoFetched=function(e,t){var i=this;return null!=this.slideInfo[e]?t():void jQuery.ajax({url:"http://www.slideshare.net/api/oembed/2",data:{url:e,format:"json"},dataType:"jsonp",success:function(n){return i.slideInfo[e]=n,t()}})},e.prototype.urlOfSlide=function(e){var t;return t=this.slideInfo[e.public_url],2===t.conversion_version?""+t.slide_image_baseurl+this.slideNumber(e)+t.slide_image_baseurl_suffix:""+t.slide_image_baseurl+"-slide-"+this.slideNumber(e)+t.slide_image_baseurl_suffix},e.prototype.changeSlide=function(e){var t,i=this;0===jQuery("#"+this.elementId).length&&(t=jQuery(this.slideContainer),t.empty(),t.append('<div id="'+this.elementId+'"></div>')),this.ensureSlideInfoFetched(e.public_url,function(){var t;return t=jQuery("#"+i.elementId+" img"),0===t.length?jQuery("#"+i.elementId).append('<img src="'+i.urlOfSlide(e)+'"/>'):t.attr("src",i.urlOfSlide(e))})},e.prototype.preload=function(e){var t=this;null!=e.public_url&&this.ensureSlideInfoFetched(e.public_url,function(){var i,n;return n=t.urlOfSlide(e),v.call(t.preloadedSlides,n)>=0?void 0:(i=new Image,i.src=n,t.preloadedSlides.push(n))})},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.SlideShareOEmbed=a,u=function(){function e(e,t,i,n){this.presentz=e,this.slideContainer=t,this.width=i,this.height=n,this.preloadedSlides=[],this.elementId=this.presentz.newElementName(),this.swfId=this.presentz.newElementName(),this.preloadSlideContainerId=this.presentz.newElementName(),this.preloadSlideId=this.presentz.newElementName()}return e.prototype.handle=function(e){return null==e.url?!1:-1!==e.url.toLowerCase().indexOf(".swf")},e.prototype.changeSlide=function(e){var t,i,n,r;0===jQuery("#"+this.swfId).length?(t=jQuery(this.slideContainer),t.empty(),t.append('<div id="'+this.elementId+'"></div>'),n={wmode:"opaque"},i={id:this.swfId},swfobject.embedSWF(e.url,this.elementId,this.width,this.height,"8",null,null,n,i)):(r=jQuery("#"+this.swfId)[0],r.data=e.url)},e.prototype.preload=function(e){var t,i,n=this;i=e.url,v.call(this.preloadedSlides,i)>=0||(jQuery("#"+this.preloadSlideId).remove(),jQuery(this.slideContainer).append('<div id="'+this.preloadSlideContainerId+'"></div>'),t={id:""+this.preloadSlideId,style:"visibility: hidden; position: absolute; margin: 0 0 0 0; top: 0;"},swfobject.embedSWF(e.url,""+this.preloadSlideContainerId,"1","1","8",null,null,null,t,function(){return n.preloadedSlides.push(e.url)}))},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.SwfSlide=u,d=function(){function e(e,t){this.presentz=e,this.slideContainer=t,this.width=300,this.currentSlide=0,this.elementId=this.presentz.newElementName(),this.speakerdeckOrigin="*"}return e.prototype.handle=function(e){return null==e.url?!1:-1!==e.url.toLowerCase().indexOf("speakerdeck.com")},e.prototype.changeSlide=function(e){var t,i,n,r,s,o=this,l=""+this.slideContainer+" iframe.speakerdeck-iframe";document.querySelector(l)?null!=this.speakerdeck?(i=this.slideNumber(e),this.speakerdeck.postMessage(JSON.stringify(["goToSlide",i]),this.speakerdeckOrigin)):console.log("no speakerdeck"):(t=jQuery(this.slideContainer),t.empty(),s=this.slideId(e),n=function(e){var t;if(-1!==e.origin.indexOf("speakerdeck.com"))return o.speakerdeckOrigin=e.origin,o.speakerdeck=e.source,t=JSON.parse(e.data),"change"===t[0]?o.currentSlide=t[1].number:void 0},window.addEventListener("message",n,!1),r=document.createElement("script"),r.type="text/javascript",r.async=!0,r.src="https://speakerdeck.com/assets/embed.js",r.setAttribute("class","speakerdeck-embed"),r.setAttribute("data-id",s),t[0].appendChild(r),this.pingInterval=setInterval(function(){var e=document.querySelector(l);return e&&e.contentWindow?(o.speakerdeck=e.contentWindow,o.speakerdeck.postMessage(JSON.stringify(["ping"]),o.speakerdeckOrigin)):void 0},500))},e.prototype.slideNumber=function(e){return parseInt(e.url.substr(e.url.lastIndexOf("#")+1))},e.prototype.slideId=function(e){return e.url.substring(e.url.lastIndexOf("/")+1,e.url.lastIndexOf("#"))},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.SpeakerDeck=d,i=function(){function e(e,t){this.presentz=e,this.slideContainer=t,this.iframeSelector=""+this.slideContainer+" iframe.iframe-slide-container"}return e.prototype.handle=function(e){return null!=e.url},e.prototype.changeSlide=function(e){var t,i;t=jQuery(this.iframeSelector),0===t.length?(i=jQuery(this.slideContainer),i.empty(),i.append('<iframe frameborder="0" class="iframe-slide-container" src="'+e.url+'"></iframe>')):t.attr("src",e.url)},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.IFrameSlide=i,o=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return w(t,e),t.prototype.handle=function(e){return null==e.url?!1:-1!==e.url.toLowerCase().indexOf("rvl.io")},t}(i),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.RvlIO=o,r=function(){function e(){}return e.prototype.handle=function(e){return null==e.url},e.prototype.changeSlide=function(){},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.NoSlide=r,s=function(){function e(e,s,h,y){var m,g;g=v(s),m=v(y),this.availableVideoPlugins={vimeo:new p(this,e,g.width,g.height),youtube:new f(this,e,g.width,g.height),wistia_plugin:new c(this,e,g.width,g.height),html5:new t(this,e,g.width,g.height)},this.availableSlidePlugins={slideshare:new l(this,h,m.width,m.height),slideshareoembed:new a(this,h,m.width,m.height),swf:new u(this,h,m.width,m.height),speakerdeck:new d(this,h,m.width,m.height),image:new n(this,h,m.width,m.height),iframe:new i(this,h,m.width,m.height),rvlio:new o(this,h,m.width,m.height),none:new r},this.videoPlugins=[this.availableVideoPlugins.vimeo,this.availableVideoPlugins.youtube,this.availableVideoPlugins.wistia_plugin],this.slidePlugins=[this.availableSlidePlugins.slideshare,this.availableSlidePlugins.slideshareoembed,this.availableSlidePlugins.swf,this.availableSlidePlugins.speakerdeck,this.availableSlidePlugins.rvlio,this.availableSlidePlugins.none],this.defaultVideoPlugin=this.availableVideoPlugins.html5,this.defaultSlidePlugin=this.availableSlidePlugins.image,this.currentChapterIndex=-1,this.currentSlideIndex=-1,this.listeners={slidechange:[],videochange:[],timechange:[],play:[],pause:[],finish:[]},this.isSynchronized=!0}var s,h,y,v;return s=function(){},v=function(e){var t,i;return t=e.split("x"),i={width:jQuery.trim(t[0]),height:jQuery.trim(t[1])}},e.prototype.registerVideoPlugin=function(e,t){this.availableVideoPlugins[e]=t,this.videoPlugins.push(t)},e.prototype.registerSlidePlugin=function(e,t){this.availableSlidePlugins[e]=t,this.slidePlugins.push(t)},e.prototype.init=function(e){var t,i,n,r,s,o,l,a;for(this.presentation=e,this.intervalSet&&this.stopTimeChecker(),this.currentChapterIndex=-1,this.currentSlideIndex=-1,l=this.presentation.chapters,n=0,s=l.length;s>n;n++){for(t=l[n],t.video._plugin=y(this,t.video),a=t.slides,r=0,o=a.length;o>r;r++)i=a[r],i._plugin=h(this,i);null==t.duration&&null!=t.slides&&t.slides.length>0&&(t.duration=t.slides[t.slides.length-1].time+5)}},e.prototype.on=function(e,t){return this.listeners[e].push(t)},e.prototype.changeChapter=function(e,t,i,n){var r,o,l,a,d,u;if(null==n&&(n=s),o=this.presentation.chapters[e],null==o)return n("no chapter at index "+e);if(l=o.slides[t],null==l)return n("no slide at index "+t);if(e!==this.currentChapterIndex||-1!==this.currentChapterIndex&&this.presentation.chapters[this.currentChapterIndex].video._plugin.skipTo(l.time,i)){if(this.changeSlide(e,t),e!==this.currentChapterIndex)for(o.video._plugin.changeVideo(o.video,i),u=this.listeners.videochange,a=0,d=u.length;d>a;a++)(r=u[a])(this.currentChapterIndex,this.currentSlideIndex,e,t);this.currentChapterIndex=e}n()},e.prototype.changeSlide=function(e,t){var i,n,r,s,o,l,a,d,u,h;for(o=this.presentation.chapters[e].slides[t],o._plugin.changeSlide(o),s=this.currentSlideIndex,this.currentSlideIndex=t,n=this.presentation.chapters[e].slides.slice(t+1,+(t+5)+1||9e9),l=0,d=n.length;d>l;l++)r=n[l],null!=r._plugin.preload&&r._plugin.preload(r);for(h=this.listeners.slidechange,a=0,u=h.length;u>a;a++)(i=h[a])(this.currentChapterIndex,s,e,t)},e.prototype.checkSlideChange=function(e){var t,i,n,r,s,o,l,a,d;for(r=this.presentation.chapters[this.currentChapterIndex].slides,s=0,l=r.length;l>s;s++)n=r[s],n.time<=e&&(t=n);for(null!=t&&r.indexOf(t)!==this.currentSlideIndex&&this.changeSlide(this.currentChapterIndex,r.indexOf(t)),d=this.listeners.timechange,o=0,a=d.length;a>o;o++)(i=d[o])(e)},y=function(e,t){var i,n;return null!=t._plugin_id&&null!=e.availableVideoPlugins[t._plugin_id]?e.availableVideoPlugins[t._plugin_id]:(n=function(){var n,r,s,o;for(s=e.videoPlugins,o=[],n=0,r=s.length;r>n;n++)i=s[n],i.handle(t)&&o.push(i);return o}(),n.length>0?n[0]:e.defaultVideoPlugin)},h=function(e,t){var i,n;return null!=t._plugin_id&&null!=e.availableSlidePlugins[t._plugin_id]?e.availableSlidePlugins[t._plugin_id]:(n=function(){var n,r,s,o;for(s=e.slidePlugins,o=[],n=0,r=s.length;r>n;n++)i=s[n],i.handle(t)&&o.push(i);return o}(),n.length>0?n[0]:e.defaultSlidePlugin)},e.prototype["synchronized"]=function(e){return this.isSynchronized=e,this.intervalSet&&!this.isSynchronized&&this.stopTimeChecker(),this.intervalSet||!this.isSynchronized||this.isPaused()?void 0:this.startTimeChecker()},e.prototype.startTimeChecker=function(){var e,t=this;this.isSynchronized&&(clearInterval(this.interval),this.intervalSet=!0,e=function(){-1!==t.currentChapterIndex&&t.checkSlideChange(t.presentation.chapters[t.currentChapterIndex].video._plugin.currentTime())},this.interval=setInterval(e,500))},e.prototype.stopTimeChecker=function(){clearInterval(this.interval),this.intervalSet=!1},e.prototype.newElementName=function(e){return null!=e?""+e+"_"+Math.round(1e6*Math.random()):"element_"+Math.round(1e6*Math.random())},e.prototype.pause=function(){return-1!==this.currentChapterIndex?this.presentation.chapters[this.currentChapterIndex].video._plugin.pause():void 0},e.prototype.isPaused=function(){return-1!==this.currentChapterIndex?this.presentation.chapters[this.currentChapterIndex].video._plugin.isPaused():void 0},e.prototype.play=function(){return-1!==this.currentChapterIndex?this.presentation.chapters[this.currentChapterIndex].video._plugin.play():void 0},e.prototype.next=function(){return this.presentation.chapters[this.currentChapterIndex].slides.length>this.currentSlideIndex+1?(this.changeChapter(this.currentChapterIndex,this.currentSlideIndex+1,!0),!0):this.presentation.chapters.length>this.currentChapterIndex+1?(this.changeChapter(this.currentChapterIndex+1,0,!0),!0):!1},e.prototype.previous=function(){return this.currentSlideIndex-1>=0?(this.changeChapter(this.currentChapterIndex,this.currentSlideIndex-1,!0),!0):this.currentChapterIndex-1>=0?(this.changeChapter(this.currentChapterIndex-1,this.presentation.chapters[this.currentChapterIndex-1].slides.length-1,!0),!0):!1},e}(),y="undefined"!=typeof exports&&null!==exports?exports:window,null==y.presentz&&(y.presentz={}),y.presentz.Presentz=s,y.Presentz=s}).call(this);