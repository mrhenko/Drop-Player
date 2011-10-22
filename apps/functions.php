<?php
	/* All relevant functions */
	
	function load_songs() {
		$files = `ls -m ../music/`;
		$song_list = explode(',', $files);
		$song_list = trim_r($song_list);
		return $song_list;
	}
	
	
	
	/*
		Trim a string or an array of strings recursively
		from akarmenia at gmail dot com 05-Apr-2011 01:49
		on http://php.net/manual/en/function.trim.php
	*/
	function trim_r($array) {
		if (is_string($array)) {
			return trim($array);
		} else if (!is_array($array)) {
			return '';
		}
		$keys = array_keys($array);
			
		for ($i=0; $i<count($keys); $i++) {
			$key = $keys[$i];
			if ( is_array($array[$key]) ) {
				$array[$key] = trim_r($array[$key]);
			} else if ( is_string($array[$key]) ) {
				$array[$key] = trim($array[$key]);
			}
		}
		return $array;
	}
?>