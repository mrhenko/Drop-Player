<?php
	/* The api that the javascripts are calling */
	require_once('functions.php');
	
	if (isset($_GET['api'])) {
		switch($_GET['api']) {
			case 'load_songs':
				$songs = load_songs();
				echo json_encode($songs);
				break;
		
		}
	}
?>