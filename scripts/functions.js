(function ($) { 
	$(document).ready(function() {
		/* Basics */
		var api = 'apps/api.php';
		var song_list;
		var audioplayer = $('#audioplayer').get(0);
		var currenttrack;
		
		
		/* Load songs */
		$('#load-songs').click(function(e){
			e.preventDefault();
			$.ajax({
				url: api + '?api=load_songs',
				context: document.body,
				success: function(result) {
					//console.log(result);
					song_list = $.parseJSON(result);
					show_song_list();
					load_song(0);
				}
			});
		});
		
		/* Stop */
		$('#stop').click(function(e) {
			e.preventDefault();
			audioplayer.pause();
			audioplayer.currentTime = 0;
		});
		
		/* Play/pause */
		$('#playpause').click(function(e){
			e.preventDefault();
			if (audioplayer.paused) {
				audioplayer.play();
			} else {
				audioplayer.pause();
			}
		});
		
		/* Skip */
		$('#skip').click(function(e){
			e.preventDefault();
			load_song(currenttrack + 1);
		});
		
		function show_song_list() {
			$(song_list).each(function(i, val) {
				$('#song-list').append('<li>' + val + '</li>');
			});
		}
		
		function load_song(track) {
			audioplayer.innerHTML = '<source src=\'music/' + song_list[track] + '\' />';
			$('#current-song').html(song_list[track]);
			currenttrack = track;
		}
		
	});
})(jQuery)