$(document).ready(function(){function e(){$.ajax({url:"altconf.json",datatype:"json",success:function(e){var t=e.data.filter(function(e){return e.location&&("Theatre 14"===e.location.id||"Theatre 15"===e.location.id)}).map(function(e){return e.speakers=e.speakers||[],{title:e.title,speakers:e.speakers.map(function(e){return e.name}).join(", "),"abstract":e["abstract"],begin:e.begin,end:e.end,theatre:parseInt(e.location.id.substr(-2))}}),n={};$.each(t,function(e,t){n[t.begin]||(n[t.begin]={}),14===t.theatre?n[t.begin].event14=t:15===t.theatre&&(n[t.begin].event15=t)});var a=$.map(n,function(e,t){return{begin:t,event14:e.event14,event15:e.event15}}).sort(function(e,t){return e.begin<t.begin?-1:e.begin>t.begin?1:0});o(a)},error:function(){o([])}})}function t(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}function n(e){return t("Panel"===e.speakers||void 0===e.speakers?e.title:e.speakers)}function a(e){function t(){var e='<div class="altconf-timeslot-event-info"><span class="altconf-timeslot-title">Lunch</span>';return e+='<div class="altconf-timeslot-lunch">Attendees gone for an hour</div>',e+="</div>"}if("Lunch"===e.title)return t(e);slug=n(e),isCurrentID=""!==i&&slug===i,isCurrentID&&console.log(slug);var a='<div class="altconf-timeslot-event-info'+(isCurrentID?" altconf-timeslot-event-info-current":"")+'" id="'+slug+'">',s=e.title,o=s.split(" "),r=o.indexOf("iOS");if(r>=0){var l='<span class="no-case">iOS</span>';o.splice(r,0,l),o.splice(r+1,1),s=o.join(" ")}return a+=s,e.speakers?(a+='<div class="altconf-timeslot-speaker">',a+="<span>"+e.speakers+"</span>",a+='<span class="altconf-timeslot-room"> &mdash; Theatre '+e.theatre+"</span>",a+="</div>"):(a+='<div class="altconf-timeslot-speaker">',a+='<span class="altconf-timeslot-room">Theatre '+e.theatre+"</span>",a+="</div>"),e["abstract"]&&(a+='<div class="altconf-timeslot-desc">',a+=e["abstract"],a+="</div>"),a+="</div>"}function s(e){return e.substr(11,5)}function o(e){var t=$("#schedule .col-xs-12");if(0===e.length)return void $(".altconf-schedule-error").replaceWith('<h4 class="altconf-schedule-error">Error loading schedule</h4>');$(".altconf-schedule-error").remove();for(var n,o,r=new Date("2015-06-08T00:00:00-07:00"),l=864e5,c=["Monday","Tuesday","Wednesday","Thursday","Friday"],d=new Date("2015-06-13T00:00:00-07:00");d>r;r.setDate(r.getDate()+1))n=e.filter(function(e){var t=new Date(e.begin),n=t-r;return l>n&&n>=0}),n.length>0&&(o=$('<div class="altconf-day"><div class="row altconf-day-info"><div class="col-sm-2 col-md-1"><h4 class="altconf-day-label">'+c[r.getDay()-1]+'</h4></div><div class="col-sm-4 col-md-5 altconf-day-room">'+(1!==r.getDay()?"Theatre 14":"")+'</div><div class="col-sm-4 col-md-5 altconf-day-room">Theatre 15</div></div></div>'),o.appendTo(t),$(n.reduce(function(e,t){if(t.event15&&("WWDC Keynote live stream"===t.event15.title||"State of the union live stream"===t.event15.title))return e;var n='<div class="row altconf-timeslot"><div class="col-sm-2 col-md-1 date-column"><span class="subtle-call-out">'+s(t.begin)+"</span>";return $.each([t.event14,t.event15],function(e,t){n+='</div><div class="col-sm-4 col-md-5 altconf-timeslot-event">',t&&(n+=a(t))}),n+="</div></div>",e+n},"")).appendTo(o));$('<script>setTimeout(function(){ window.location.hash = "'+i+'"; $(".altconf-timeslot-desc").readmore(); if ("'+i+'" !== "") { $("#'+i+' .altconf-timeslot-desc").readmore("toggle"); } },500);</script>').appendTo(t)}var i=window.location.hash.substr(1);window.location.hash="";var r=9e5;e(),setInterval(function(){e()},r)});