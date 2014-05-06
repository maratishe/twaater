<?php
set_time_limit( 0);
ob_implicit_flush( 1);
$prefix = ''; if ( is_dir( "ajaxkit")) $prefix = 'ajaxkit/'; for ( $i = 0; $i < 3; $i++) { if ( ! is_dir( $prefix . 'lib')) $prefix .= '../'; else break; }
if ( ! is_file( $prefix . "env.php")) $prefix = '/web/ajaxkit/'; // hoping for another location of ajaxkit
if ( ! is_file( $prefix . "env.php")) die( "\nERROR! Cannot find env.php in [$prefix], check your environment! (maybe you need to go to ajaxkit first?)\n\n");
//require_once( 'requireme.php');
// global functions and env
require_once( $prefix . 'functions.php');
require_once( $prefix . 'env.php'); //echo "env[" . htt( $env) . "]\n";
// additional (local) functions and env (if present)
if ( is_file( "$BDIR/functions.php")) require_once( "$BDIR/functions.php");
if ( is_file( "$BDIR/env.php")) require_once( "$BDIR/env.php");
htg( hm( $_GET, $_POST));  
//if ( isset( $ss)) htg( jsonparse( base64_decode( $ss)), '', 'ss'); if ( isset( $ssuid)) $uid = $ssuid;
//$uid = 'nobody'; checksession(); if ( isset( $ssuid)) $uid = $ssuid;

if ( ! is_dir( 'stuff')) { `mkdir stuff`; `chmod -R 777 stuff`; }
if ( $action == 'write') { // file, stuff
	$out = fopen( "stuff/$file", 'w');
	fwrite( $out, $stuff ? $stuff : ' ');
	fclose( $out);
	$JO[ 'stuff'] = 'ok';
	die( jsonsend( $JO));
}
if ( $action == 'read') { // file
	if ( ! is_file( "stuff/$file")) { $JO[ 'stuff'] = null; die( jsonsend( $JO)); }
	$in = fopen( "stuff/$file", 'r');
	$stuff = fread( $in, filesize( "stuff/$file"));
	fclose( $in);
	$JO[ 'stuff'] = $stuff;
	die( jsonsend( $JO));
}

?>