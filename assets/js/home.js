$(document).ready(function(){function o(o){var n=o.find(".js-videoIframe"),t=n.data("src");o.addClass("videoWrapperActive"),n.attr("src",t)}if($(".container-button button").click(function(){$(".container-button").addClass("active")}),$(".container-button .box_bottom .close").click(function(){$(".container-button").removeClass("active")}),$(".downloadLink").click(function(o){o.preventDefault();var n=$(this).attr("href");window.open($(this).attr("data-download")),window.location=n,window.focus()}),$(".carousel").carousel({interval:9e3,pause:"hover",keyboard:!0}),$(".carousel").on("slide.bs.carousel",function(){$("#hero").toggleClass("second")}),$("#download").click(function(o){o.preventDefault();var n=$(this).attr("href");window.location=n}),$(window).width()>=8){var n=!1,t=10,a=$("nav.navtop"),e=function(){n=!0,a.show(),a.removeClass("hideBar").addClass("show")},i=function(){n=!1,a.hide(),a.removeClass("show").addClass("hideBar")};document.onscroll=function(){var o=$(window).scrollTop();n?t>o&&i():o>t&&e()}}$(document).on("click",".js-videoPoster",function(n){n.preventDefault();var t=$(this),a=t.closest(".js-videoWrapper");o(a)})});