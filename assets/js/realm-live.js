$(document).ready(function(){function a(){$.ajax({url:"https://static.realm.io/wwdc/live.json",success:function(a){for(var o=a.feed.entry,i=[],c=0;c<o.length;c++){var m=o[c],u=t(m),d=r(u);d&&i.push(d)}if(i.length>0){n(i);var l=s(i);v||e(l)}}})}function t(a){var t={};return t.readyToPost=a.gsx$readytopost.$t,t.timestamp=a.gsx$timestamp.$t,t.timestamp&&(t.timestamp=t.timestamp+"-07:00",t.shortTimestamp=moment.parseZone(t.timestamp).format("dddd")),t.postType=a.gsx$posttype.$t,t.featured=a.gsx$featured.$t,t.url=a.gsx$url.$t,t.mediaUrl=a.gsx$mediaurl.$t,t.mainAuthor=a.gsx$mainauthor.$t,t.authorJobTitle=a.gsx$authorjobtitle.$t,t.mainAuthorAvatar=a.gsx$mainauthoravatar.$t,t.content=a.gsx$content.$t,t.location=a.gsx$location.$t,t}function e(a){v=!0;for(var t=0;t<a.length;t++){var e=t,r=a[t];for(var n in r){var s='<div class="row card-row js-card-row-container">';"Featured"==n&&(s='<div class="row card-row js-card-row-container featured">');var o='<h3 class="card-row title col-xs-12">'+n+"</h3>",i="js-card-container-"+e,c="."+i,m='<div class="'+i+'">',u=s+o+m;$(".js-cards-container").prepend(u);for(var d=r[n],l=0;l<d.length;l++){var p=d[l],f=moment.parseZone(p.timestamp).fromNow(),g=h(f);switch(p.postType){case"image":var b="url('"+p.mediaUrl+"') center no-repeat",w=$('.js-card[data-card-type="image"]').clone();w.removeClass("hidden").attr("data-card-type","clone"),w.find(".js-content").css("background",b),w.find("span.js-timestamp").html(g),w.find("span.js-location").html(p.location),w.find(".js-info").html(p.content),w.attr("href",p.url),$(c).prepend(w);break;case"tweet":var y="url('"+p.mainAuthorAvatar+"') center no-repeat",w=$('.js-card[data-card-type="tweet"]').clone();w.removeClass("hidden").attr("data-card-type","clone"),w.find("span.js-tweet").html(p.content),w.find("span.js-author").html(p.mainAuthor),w.find(".js-author-img").css("background",y),w.find("span.js-handle").html(p.authorJobTitle),w.find("span.js-timestamp").html(g),w.attr("href",p.url),$(c).prepend(w);break;case"text":var w=$('.js-card[data-card-type="text"]').clone();w.removeClass("hidden").attr("data-card-type","clone"),w.find("span.js-text").html(p.content),w.find("span.js-author").html(p.mainAuthor),w.find("span.js-handle").html(p.authorJobTitle),w.find("span.js-timestamp").html(g),w.attr("href",p.url),$(c).prepend(w);break;case"video":var j="url('"+p.mediaUrl+"') center no-repeat",w=$('.js-card[data-card-type="video"]').clone();w.removeClass("hidden").attr("data-card-type","clone"),w.find(".js-content").css("background",j),w.find("span.js-timestamp").html(g),w.find(".js-info").html(p.content),w.attr("href",p.url),$(c).prepend(w)}}}}}function r(a){if(""==a.readyToPost)return!1;var t=[];if(""!=a.postType){switch(a.postType){case"tweet":t=["timestamp","url","mainAuthor","content","mainAuthorAvatar"];break;case"video":t=["timestamp","url","mediaUrl","content"];break;case"image":t=["timestamp","url","mediaUrl","location"];break;case"text":t=["timestamp","mainAuthor","content","mainAuthorAvatar"];break;default:return!1}for(var e=0;e<t.length;e++)if(""==a[t[e]])return!1;return a}}function n(a){f?f<a.length&&$("a.new-content").addClass("active"):f=a.length}function s(a){var t=[],e=o(a),r=e.regular,n=e.featured,s={Featured:n},c=e.now,u={"Happening now":c};if(r.length){var h=d(r),f=p(h);for(i=0;i<r.length;i++){var v=r[i];f[v.shortTimestamp].push(v)}var g=m(f);t=l(g)}return n.length>0&&t.push(s),c.length>0&&t.push(u),t}function o(a){var t=[],e=[],r=a,n=[],s={};for(i=0;i<r.length;i++){var o=r[i];if(o.featured)e.push(o);else{var m=moment.utc(),u=moment.parseZone(o.timestamp),d=m.diff(u,"minutes");0>d?t.push(o):n.push(o)}}c(t);return s.now=t,s.featured=e,s.regular=n,s}function c(a){var t=[],e={},r=[];for(i=0;i<a.length;i++){var n=a[i];e[n.timestamp]=n}for(var n in e)t.push(n);var s=t.sort(u);for(i=0;i<s.length;i++){var o=s[i];r=e[o]}return r}function m(a){for(var t in a){var e=a[t],r={},n=[];for(i=0;i<e.length;i++){var s=e[i];r[s.timestamp]=s}for(var o in r)n.push(o);n.sort(u);var c=[];for(i=0;i<n.length;i++){var o=n[i];c.push(r[o])}a[t]=c}return a}function u(a,t){var e=moment(a),r=moment(t);return r>e?-1:e>r?1:0}function d(a){for(var t={},e=0;e<a.length;e++){var r=a[e];t[r.shortTimestamp]=r.timestamp}var n=[];for(var s in t)n.push(s);return n}function l(a){var t={},e={},r=[],n=[];for(var s in a){var o=a[s][0].timestamp;r.push(o),t[s]=o,e[o]=s}var c=r.sort(u);for(i=0;i<c.length;i++){var m={},d=c[i],l=e[d];m[l]=a[l],n.push(m)}return n}function p(a){for(var t={},e=0;e<a.length;e++)t[a[e]]=[];return t}function h(a){var t=a.split(" "),e=t[0],r=t[1];t[2];switch("a"!=e&&"an"!=e||(e="1"),r){case"minute":r="m";break;case"minutes":r="m";break;case"hour":r="h";break;case"hours":r="h";break;case"day":r="d";break;case"days":r="d";break;case"month":r="mo";break;case"months":r="mo";break;case"year":r="yr";break;case"years":r="yr";break;default:r=r}var n=e+r+" ago";return"in"==e&&(n=e+r),n}$("#clock").countdown("2016/06/13 11:59:56").on("update.countdown",function(a){var t=" %H Hours %M Minutes %S Seconds";a.offset.days>0&&(t="%-d day%!d "+t),a.offset.weeks>0&&(t="%-w week%!w "+t),$(this).html(a.strftime('<span class="flex column card center"><span class="time">%D</span><br><span class="subcounter">days</span></span><span class="flex column card center"><span class="time">%H</span><br><span class="subcounter">hours</span></span><span class="flex column card center"><span class="time">%M</span><br><span class="subcounter">min</span></span><span class="flex column card center"><span class="time">%S</span><br><span class="subcounter">sec</span></span>'))}).on("finish.countdown",function(){$("body").addClass("online")});var f,v=!1;a();setInterval(a,15e3)});