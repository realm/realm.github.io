function make_https(t,e){return e?"https://realm.io"+t.pathname:"http://realm.io"+t.pathname}function setShareButtonLink(t,e,n){var o=e;void 0!==n&&(o=e.replace(/CONTENT/g,encodeURIComponent(n)).replace(/LINK/g,encodeURIComponent(make_https(document.location,!0)))),t.children("a").attr("href",o)}function incrementTotalShareCount(t){shareCountTotal+=t,shareCountTotal>0&&$("#social_bar").children(".share-count").text(shareCountTotal).removeClass("invisible")}function getShareCounts(t,e,n){t.length&&e&&$.ajax({url:e.replace("LINK",make_https(document.location,!0)),dataType:"jsonp",success:function(t){var e=n(t);e&&incrementTotalShareCount(e)}})}function setupShareButtons(t){setupTwitterButton(t.twitter),setupFacebookButton(t.facebook),setupHackerNewsButton(t.hackerNews),setupRedditButton(t.reddit),setupLinkedInButton(t.linkedin),setupGooglePlusButton(),setupEmailButton(t.email),setupHatenaButton(),setupPocketButton(t.pocket)}function setupTwitterButton(t){setShareButtonLink($(".twitter"),"https://twitter.com/intent/tweet?text=CONTENT",t)}function setupFacebookButton(t){var e=$(".facebook");setShareButtonLink(e,"https://www.facebook.com/sharer/sharer.php?u=LINK&t=CONTENT",t),getShareCounts(e,"https://graph.facebook.com/?id=LINK",function(t){return t.shares})}function setupHackerNewsButton(t){var e=encodeURIComponent(make_https(document.location,!0));$.ajax({url:"https://hn.algolia.com/api/v1/search?tags=story&restrictSearchableAttributes=url&query="+e,success:function(n){var o=n.hits[0];if(o){incrementTotalShareCount(o.points);var a="http://news.ycombinator.com/item?id="+o.objectID;setShareButtonLink($(".hackernews"),a);var u=$(".hackernews-link");setShareButtonLink(u,a),u.removeClass("hidden")}else{var r="http://news.ycombinator.com/submitlink?u="+e+"&t="+encodeURIComponent(t);setShareButtonLink($(".hackernews"),r)}}})}function setupRedditButton(t){function e(t){var e,n,o=0,a=-(1/0);return t.forEach(function(t){n=t.data.score,o+=n,n>=a&&(e="https://www.reddit.com"+t.data.permalink,a=n),"programming"===t.data.subreddit&&(e="https://www.reddit.com"+t.data.permalink,a=1/0)}),{count:o,link:e}}var n=encodeURIComponent(make_https(document.location,!0));$.ajax({url:"https://reddit.com/api/info.json?jsonp=?&url="+n,dataType:"jsonp",success:function(n){var o=n.data.children;if(o.length>0){var a=e(o);incrementTotalShareCount(a.count),setShareButtonLink($(".reddit"),a.link)}else setShareButtonLink($(".reddit"),"//www.reddit.com/r/programming/submit?url=LINK&title=CONTENT",t)}})}function setupLinkedInButton(t){var e=$(".linkedin");setShareButtonLink(e,"https://www.linkedin.com/shareArticle?mini=true&url=LINK&title=CONTENT",t),getShareCounts(e,"https://www.linkedin.com/countserv/count/share?url=LINK",function(t){return t.count})}function setupGooglePlusButton(){setShareButtonLink($(".gplus"),"https://plus.google.com/share?url=LINK",null),$(".gplus").length&&$.ajax({type:"POST",url:"https://clients6.google.com/rpc",processData:!0,contentType:"application/json",data:JSON.stringify({method:"pos.plusones.get",id:document.location,params:{nolog:!0,id:document.location,source:"widget",userId:"@viewer",groupId:"@self"},jsonrpc:"2.0",key:"p",apiVersion:"v1"}),success:function(t){t&&t.result&&t.result.metadata&&t.result.metadata.globalCounts&&t.result.metadata.globalCounts.count&&incrementTotalShareCount(t.result.metadata.globalCounts.count)}})}function setupEmailButton(t){setShareButtonLink($(".email"),"mailto:?Subject=CONTENT&Body=LINK",t)}function setupHatenaButton(){var t=$(".hatena");setShareButtonLink(t,"http://b.hatena.ne.jp/bookmarklet?url=LINK",null),getShareCounts(t,"https://b.hatena.ne.jp/entry.count?url=LINK",function(t){return t})}function setupPocketButton(t){setShareButtonLink($(".pocket"),"http://getpocket.com/edit?url=LINK&title=CONTENT",t)}var shareCountTotal=0;