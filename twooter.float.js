$.ioutils.nolog = false;
$.ioutils.nostats = true;
$.ioutils.callbacktimeout = '20s';
var $body = $( 'body').css({ 'font-size': $.io.defs.fonts.big})
var AS, STR, AUTH, DRILLS, DOCS, KS; AUTH = null; DRILLS = null; DOCS = {};
//var action = null; action = chrome.browserAction;  
//var runtime = null; runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
$body.css({ width: '500px', height: 'auto', 'background-color': '#eee', color: '#555', margin: '5px', padding: '0px', 'font-size': $.io.font.normal})
var $one = $body.ioover( true);
var $two = $body.ioover( true);
var KVS = null; $.io.kvstorage.defaultdriver = 'chromestorage'; $body.kvstorage( function( kvs) { KVS = kvs; });
var L = []; var ks = $.ttl( 'hashtags,accounts,hashtag'); for ( var i in ks) L.push( '<strong>' + ks[ i] + '</strong>');
var B = {};
//$body.ioover( true).append( 'modes: ' + $.ltt( L, ' - ')).find( 'strong').iotextbutton( function( k) { eval( B[ k])(); }, '#f00');
$body.ioover( true).append( 'There is nothing here, everything runs on every (re)load of a <strong>Twitter</strong> page.');
$body.ioover( true).append( 'Although, come to think of it, I can let you <strong>reset</strong> your KVS.').find( 'strong').iotextbutton( function() {  KVS.clear(); }, '#FD2');

