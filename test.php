<?php
	/*	This is a "scratch pad". Its purpose is to try out various functions that
		goes into the apps objects.
	*/
	$files = `ls -m music/`;
	$songList = explode(',', $files);
	
	echo '<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8" />
		<title>Test</title>
	</head>
	<body>
		<h1>Music files</h1>
		';
		print_r($songList);
		echo '
	</body>
	</html>';
?>