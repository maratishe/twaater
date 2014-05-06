$.ioutils.nolog = true;
$.ioutils.nostats = true;
var TOP = 10;	// top and botton how many tags to use
var action = chrome.browserAction;  
var runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
var $hidden = $( 'body').ioover().css({ left: '-10px', width: '5px', height: '5px'})
var $hidden2 = $( 'body').ioover().css({ left: '-10px', width: '5px', height: '5px'})
var $popup = $( 'body').ioover({ position: 'fixed', right: '5px', top: '5px', width: '40%', height: 'auto', 'z-index': 1000000}).attr( 'id', 'twooterPopup').ioground( '#000', 0.9).ioover( true).css({ padding: '5px', color: '#fff'});
//var $slide = $( 'body').ioover({ position: 'fixed', top: '10%', height: '80%', right: '-5px', width: '85%', 'z-index': 1000000})
//var $SLIDE; var slide = null; $slide.sideslideright( 'summary', $.io.defs.fonts.small, function( b) { slide = b; $SLIDE = slide.inner().mockvframe().inner(); }, '#000,0.9') ; 
function popup( text, timeout) { $popup.ioanimoutemptyin( 'slow', function() { $popup.append( 'Msg: ' + text); if ( timeout) $popup.oneTime( '5s', function() { $popup.ioanimoutremove( 'fast'); })})}
//  KVS: key-value (chrome) store   CS: cloud store
var KVS = null; $.io.kvstorage.defaultdriver = 'chromestorage'; $hidden.kvstorage( function( kvs) { KVS = kvs; });
var CS = $hidden2.dropboxlogger( { appkey: 'zowlkn1e8wio1kd', appsecret: 'wuibsyyvg8m59lj', reqauth: { token:"Y5EOhosTMLaterXt", tokensecret:"5yinu000VD7BaGZf"}, accauth: { token:"smhjytfcbjtijjj4", tokensecret:"aekdqdq6v4begdp", uid:"200306293"}}, 'trO', 1000000);
var B = {}; var TASK = []; var SESS = null; var $size;
var tweetnew = function( $box, tags, c, timeless) {  
		var $b = $box; var h2 = {}; var $b2 = $b.find( 'div[class="ProfileTweet-authorDetails"]');
		h2.name = $.trim( $b2.find( 'span[class="at"]').first().parent().text()).substr( 1);
		h2.fullname = $.trim( $b2.find( 'b').first().text());
		h2.when = $.trim( $b2.find( 'span[class="u-pullLeft"]').last().text());
		if ( ! timeless && $.ttl( h2.when + '*', 'h').length == 2) return c( null);
		h2.text = $.trim( $b.find( 'p').first().text());
		h2.links = {}; $b.find( 'p').first().find( 'a').each( function() { if ( $( this).attr( 'title')) h2.links[ $( this).attr( 'href')] = $( this).attr( 'title'); });
		$b.find( 'p').first().next().find( 'a').each( function() { if ( $( this).attr( 'title')) h2.links[ $( this).attr( 'href')] = $( this).attr( 'title'); });
		h2.tags = {}; $b.find( 'p').first().find( 's').each( function() { if ( $( this).text() != '#') return; var tag = $( this).next().text(); h2.tags[ tag] = true; if ( $.isNumber( tags[ tag])) tags[ tag]++; delete h2.links[ $( this).parent().attr( 'href')]; }); h2.tags = $.hk( h2.tags);
		h2.mentions = {}; $b.find( 'p').first().find( 's').each( function() { if ( $( this).text() != '@') return; var tag = $( this).next().text(); h2.mentions[ tag] = true; delete h2.links[ $( this).parent().attr( 'href')]; }); h2.mentions = $.hk( h2.mentions);
		h2.stats = {}; $b.find( 'button').each( function() { if ( $( this).attr( 'data-activity-popup-title')) h2.stats[ $( this).attr( 'data-activity-popup-title')] = true; }); h2.stats = $.hk( h2.stats);
		c( h2);
	}
var tweetold = function( $box, tags, c, nostats, timeless) { 
	var $b = $box; var h2 = {};
	h2.name = $b.find( 's').first().next().text();
	h2.fullname = $.trim( $b.find( 's').first().parent().prev().prev().text());
	h2.when = $.trim( $b.find( 'div[class="content"]').first().find( 'small[class="time"]').first().find( 'a').first().text());
	if ( ! timeless && $.ttl( h2.when + '*', 'h').length == 2) return c( null);
	h2.text = $.trim( $b.find( 'div[class="content"]').first().find( 'p').first().text());
	h2.links = {}; $b.find( 'div[class="content"]').first().find( 'p').first().find( 'a').each( function() { if ( $( this).attr( 'title')) h2.links[ $( this).attr( 'href')] = $( this).attr( 'title'); });
	h2.tags = {}; $b.find( 'div[class="content"]').first().find( 'p').first().find( 's').each( function() { if ( $( this).text() != '#') return; var tag = $( this).next().text(); h2.tags[ tag] = true; if ( $.isNumber( tags[ tag])) tags[ tag]++; delete h2.links[ $( this).parent().attr( 'href')]; }); h2.tags = $.hk( h2.tags);
	h2.mentions = {}; $b.find( 'div[class="content"]').first().find( 'p').first().find( 's').each( function() { if ( $( this).text() != '@') return; var tag = $( this).next().text(); h2.mentions[ tag] = true; delete h2.links[ $( this).parent().attr( 'href')]; }); h2.mentions = $.hk( h2.mentions);
	if ( nostats) return c( h2);
	// if summary is there, try to click the link
	$box.find( 'b').each( function() { if ( $.trim( $( this).find( 'span').first().text()) != 'Expand') return; $( this).parent().simulate( 'click'); })
	$box.find( 'b').each( function() { if ( $.trim( $( this).find( 'span').first().text()) != 'View summary') return; $( this).parent().simulate( 'click'); })
	$box.stopTime().oneTime( '500ms', function() { // wait until summary loads  
		h2.stats = {}; $b.find( 'a').each( function() { if ( $( this).attr( 'data-activity-popup-title')) h2.stats[ $( this).attr( 'data-activity-popup-title')] = true; }); h2.stats = $.hk( h2.stats);
		c( h2);
	})
	
}
// large-scale functionality, once per page load
B.start = function( task) { KVS.get( 'trstate', function( h) { 
	$.log( 'start() task', $.any2json( task));
	var TAGS = {}; var ACCS = {}; var trstate = null; var now = $.iotime();
	if ( h && h.trstate) trstate = $.json2hutf8( h.trstate, true);
	if ( trstate && trstate.tags) TAGS = trstate.tags;
	$.log( 'start() TAGS', $.any2json( TAGS));
	if ( trstate && trstate.sess) SESS = trstate.sess;
	$.log( 'start() SESS', $.any2json( SESS));
	if ( SESS && SESS.sid) $size.empty().append( SESS.offset + ':' + SESS.sid.substr( 0, 5));
	var B = []; $( 'ol[id="stream-items-id"]').children().each( function() { $me = $( this); var good = true; $me.find( 'div').each( function() { if ( $( this).attr( 'promoted-tweet') !== undefined) good = false; }); if ( good) B.push( $me); })
	var TW = [];
	var read = function( c) { $hidden2.ioloop( B, '2s', function( dom, value, sleep, c2) { 
		if ( ! value.length) { c2(); c(); return; }
		tweetold( value.shift(), {}, function( tw) { if ( ! tw) return c2([]); TW.push( tw); c2( value); $.log( $.any2json( tw)); })
	})}
	read( function() { 
		$.log( 'start() read() done, TW.length', TW.length);
		// remove old hashtags
		for ( var i in TW) for ( var ii in TW[ i].tags) TAGS[ TW[ i].tags[ ii]] = $.iotime();
		for ( var i in TW) ACCS[ TW[ i].name] = true;
		for ( var tag in TAGS) if ( TAGS[ tag] < $.iotime() - 1000 * 60 * 60 * 6) delete TAGS[ tag]; // 6 hours
		//$.log( 'tags', $.any2json( TAGS));
		//$.log( 'accs', $.any2json( ACCS));
		var tags = {}; for ( var tag in TAGS) tags[ tag] = 0;	// will keep this cound in mind, will use later
		var TASKS = [];
		for ( var acc in ACCS) TASKS.push({ mode: 'account', name: acc});
		if ( ! TASKS.length) return B.next();	// go to next round
		var lastask = TASKS.pop(); lastask.last = true; TASKS.push( lastask); // will denote end of accounts -- will tally statistics on hashtags and create new tasks
		KVS.set({ tr: TASKS}); // will process them until run out of tasks   -- these are all account tasks
		CS.add({ code: 'start', time: now, TAGS: $.h2jsonutf8( $.hk( TAGS), true), ACCS: $.h2jsonutf8( $.hk( ACCS), true), tweets: $.h2jsonutf8( TW, true)}, function( sess) { 
			if ( ! sess) return popup( 'ERROR! Something went wrong!');
			$.log( 'start() sess', $.any2json( sess));
			KVS.set({ trstate: $.h2jsonutf8({ tags: TAGS, sess: sess, tags2: tags}, true)}, function() { window.location.href = 'https://twitter.com/' + TASKS[ 0].name; });
		}, SESS);
		
	})
	
})}
B.account = function( task, next) { KVS.get( 'trstate', function( h) { 
	$.log( 'account() KVS', $.any2json( h));
	$.log( 'account() task/next', $.any2json( task), $.any2json( next));
	var TAGS = {}; var ACCS = {}; var trstate = null; var tags = {}; var now = $.iotime();
	if ( h && h.trstate) trstate = $.json2hutf8( h.trstate, true);
	$.log( 'account() trstate', $.any2json( trstate));
	if ( trstate && trstate.tags) TAGS = trstate.tags;
	$.log( 'account() TAGS', $.any2json( TAGS));
	if ( trstate && trstate.sess) SESS = trstate.sess; if ( ! SESS) return popup( 'ERROR! No SESS!');
	$.log( 'account() SESS', $.any2json( SESS));
	if ( SESS && SESS.sid) $size.empty().append( SESS.offset + ':' + SESS.sid.substr( 0, 5));
	if ( trstate && trstate.tags2) tags = trstate.tags2;
	$.log( 'account() tags', $.any2json( tags));
	var AS = {};	var ASmap = $.tth( 'tweet_stats=Tweets,following_stats=Following,follower_stats=Followers'); var ASmapR = $.hvak( ASmap); // account stats
	$( 'ul[class="ProfileNav-list"]').first().children().each( function() { 	// new type 
		var $b = $( this); var k = $.trim( $b.find( 'span').first().text()); if ( ! ASmapR[ k]) return;
		AS[ k] = $.trim( $b.find( 'span').last().text());
	})
	$( 'div[class="default-footer"]').first().find( 'a[class="js-nav"]').each( function() {	// old type 
		var $b = $( this);
		AS[ ASmap[ $.trim( $b.attr( 'data-element-term'))]] = $.trim( $b.text());
	})
	$.log( 'start() AS', $.any2json( AS));
	var B = [];
	$( 'div[class="GridTimeline-items"]').first().children().each( function() { B.push({ type: 'new', box: $( this)}); })
	$( 'ol[id="stream-items-id"]').children().each( function() { B.push({ type: 'old', box: $( this)}); })
	var TW = [];	// [ { }, ...]
	var read = function( c) { $hidden2.ioloop( B, '2s', function( dom, value, sleep, c2) { 
		if ( ! value.length) { c2(); c(); return; }
		var h = value.shift();
		if ( h.type == 'old') tweetold( h.box, tags, function( tw) { if ( ! tw) return c2([]); TW.push( tw); c2( value); $.log( $.any2json( tw)); })
		if ( h.type == 'new') tweetnew( h.box, tags, function( tw) { if ( ! tw) return c2([]); TW.push( tw); c2( value); $.log( $.any2json( tw)); })
	})}
	read( function() { CS.add({ code: 'account', name: task.name, time: now, stats: AS, tags: $.h2jsonutf8( tags, true), tweets: $.h2jsonutf8( TW, true)}, function( sess) { 
		if ( ! sess) return popup( 'ERROR! Something went wrong!');
		$.log( 'account() sess', $.any2json( sess));
		$.log( 'account() read() done, TW.length', TW.length);
		KVS.set({ trstate: $.h2jsonutf8({ tags: TAGS, sess: sess, tags2: tags}, true)});
		if ( next) return window.location.href = 'https://twitter.com/' + next.name; // go to the next account
		// create new tasks for tags
		var tags2 = {};	// TOP is the base count,  take TOP from top, bottom and then randomly everywhere else
		var HL = []; for ( var tag in tags) HL.push({ tag: tag, count: tags[ tag]}); HL = $.hlsort( HL, 'count', true);
		for ( var i = 0; i < TOP && HL.length; i++) { var h2 = HL.shift(); tags2[ h2.tag] = true; }
		for ( var i = 0; i < TOP && HL.length; i++) { var h2 = HL.pop(); tags2[ h2.tag] = true; }
		$.mathShuffle( HL); for ( var i = 0; i < TOP && HL.length; i++) { var h2 = HL.shift(); tags2[ h2.tag] = true; }
		var TASKS = []; for ( var tag in tags2) TASKS.push({ mode: 'hashtag', tag: $.s2s64utf8( tag)});
		if ( ! TASKS.length) return B.next();
		KVS.set({ tr: TASKS}, function() { window.location.href = 'https://twitter.com/search?q=' + '%23' + $.s642sutf8( TASKS[ 0].tag) + '&src=hash'; })
	}, SESS);})
	
})}
B.hashtag = function( task, next) { KVS.get( 'trstate', function( h) { // task: 	
	$.log( 'hashtag() task/next', $.any2json( task), $.any2json( next));
	var TAGS; var trstate = null; var now = $.iotime();
	if ( h && h.trstate) trstate = $.json2hutf8( h.trstate, true);
	if ( trstate && trstate.tags) TAGS = trstate.tags;
	if ( trstate && trstate.sess) SESS = trstate.sess; if ( ! SESS) return popup( 'ERROR! No SESS!');
	if ( SESS && SESS.sid) $size.empty().append( SESS.offset + ':' + SESS.sid.substr( 0, 5));
	$.log( 'hashtag() SESS', $.any2json( SESS));
	var B = [];
	$( 'div[class="GridTimeline-items"]').first().children().each( function() { B.push({ type: 'new', box: $( this)}); })
	$( 'ol[id="stream-items-id"]').children().each( function() { B.push({ type: 'old', box: $( this)}); })
	var TW = [];	// [ { }, ...]
	var read = function( c) { $hidden2.ioloop( B, '1ms', function( dom, value, sleep, c2) {	// read without expanding 
		if ( ! value.length) { c2(); c(); return; }
		var h = value.shift();
		if ( h.type == 'old') tweetold( h.box, {}, function( tw) { if ( ! tw) return c2([]); TW.push( tw); c2( value); $.log( $.any2json( tw)); }, true, true); 
		if ( h.type == 'new') tweetnew( h.box, {}, function( tw) { if ( ! tw) return c2([]); TW.push( tw); c2( value); $.log( $.any2json( tw));  }, true)
	})}
	// read 2 times, second time after clicking on the ALL button
	read( function() { 
		var top = $.h2jsonutf8( TW, true); TW = [];
		$.log( 'hashtag() top TW.length', top.length);
		$( 'a[class="js-nav"]').each( function() { if ( $.trim( $( this).text()) != 'All') return; $( this).simulate( 'click'); })
		$hidden2.stopTime().oneTime( '1s', function() { read( function() { CS.add({ code: 'hashtag', name: task.tag, time: now, top: top, all: $.h2jsonutf8( top, true)}, function( sess) { 
			if ( ! sess) return popup( 'ERROR! Something went wrong!');
			$.log( 'hashtag() all TW.length', TW.length);
			KVS.set({ trstate: $.h2jsonutf8({ tags: TAGS, sess: sess}, true)});
			if ( next) return window.location.href = 'https://twitter.com/search?q=' + '%23' + $.s642sutf8( next.tag) + '&src=hash'; // go to the next account
			// end of job, next task
			TASKS = [ { mode: 'next'}];
			KVS.set({ tr: TASKS}, function() { window.location.href = 'https://twitter.com/i/notifications'; })
		}, SESS);})})
		
	})
	
})}
B.next = function() { KVS.get( 'trstate', function( h) { 
	$.log( 'next()');
	var TAGS = {}; var trstate = null; var now = $.iotime();
	if ( h && h.trstate) trstate = $.json2hutf8( h.trstate, true);
	if ( trstate && trstate.tags) TAGS = trstate.tags;
	$.log( 'start() TAGS', $.any2json( TAGS));
	if ( trstate && trstate.sess) SESS = trstate.sess;
	$.log( 'start() SESS', $.any2json( SESS));
	if ( SESS && SESS.sid) $size.empty().append( SESS.offset + ':' + SESS.sid.substr( 0, 5));
	// remove current tasks, and wait until the next time
	KVS.remove( 'tr');	// so that I can start from clear sheet
	popup( 'Session over, another one in 60s');
	$popup.stopTime().oneTime( '60s', function() { window.location.href = 'https://twitter.com'; })
})}
popup( 'Click to <strong>stop</strong> or <strong>clear</strong> (<span></span>)');
$hidden.stopTime().oneTime( '8s', function() { KVS.get( 'tr', function( h) { 
	$size = $popup.find( 'span').last(); $popup.find( 'strong').iotextbutton( function( k) { if ( k == 'stop') { $hidden.stopTime(); $hidden2.stopTime(); return; }; if ( k == 'clear') KVS.clear(); }, '#FD2'); // cancel running the script
	if ( ! h || ! h.tr) return B.start();
	var H = h.tr; //$.log( 'H', $.any2json( H));
	if ( ! H.length) return B.next();
	TASK = H.shift();
	KVS.set({ tr: H});
	eval( B[ TASK.mode])( TASK, H.length ? H[ 0] : null);
})})


