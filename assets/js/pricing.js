$(document).ready(function(){var e=localStorage.getItem("pricingSubmitDate");if(e){var t=3e5,n=new Date,i=new Date(JSON.parse(e));t>n-i&&($(".js-top-banner").hide().removeClass("hidden").fadeIn(500),setTimeout(function(){$(".js-top-banner").animate({height:0},500,function(){$(".js-top-banner").remove()})},5e3)),localStorage.setItem("pricingSubmitDate","null")}$(".js-pricing-enterprise-form").submit(function(){var e=JSON.stringify(new Date);localStorage.setItem("pricingSubmitDate",e),$(".js-submit-enterprise-form").attr("disabled","true")})});