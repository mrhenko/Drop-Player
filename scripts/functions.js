(function ($) { 
	$(document).ready(function() {
		/* Basics */
		var api = 'apps/api.php';
		var song_list;
		var audioplayer = $('#audioplayer').get(0);
		var currenttrack;
		var currentposition = $('#position').get(0);
		var totaltracks;
		
		load_songs();
		
		/* Load songs */
		/*$('#load-songs').click(function(e){
			e.preventDefault();
			load_songs();
		});*/
		
		function load_songs() {
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
		}
		
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
		
		/* Position update */
		$(audioplayer).bind('timeupdate', function(){
			var position = Math.round(audioplayer.currentTime);
			$(currentposition).html(position);
			
			/* If the track ends */
			if (position >= Math.round(audioplayer.duration)) {
				/* Next track */
				load_song(currenttrack + 1);
				load_songs();
			}
		});
		
		/* A song is selected in the playlist */
		$('#playlist a').live('click', function(e){
			e.preventDefault();
			$('#playlist a').removeClass('selected');
			$(this).addClass('selected');
			play_selected_song();
		});
		
			
		function show_song_list() {
			$('#playlist').html('');
			$(song_list).each(function(i, val) {
				$('#playlist').append('<li><a href="#" data-song-number="' + i + '">' + val + '</a></li>');
			});
		}
		
		function load_song(track) {
			if ($('#random').is(':checked')) { // Do we use random?
				// Randomize
				track = Math.floor(Math.random()* song_list.length);
				while (track == currenttrack) {
					track = Math.floor(Math.random()* song_list.length);
				}
			}
			
			audioplayer.innerHTML = '<source src=\'music/' + song_list[track] + '\' />';
			$('#current-song').html(song_list[track]);
			currenttrack = track;
		}
		
		/* Play the selected song */
		function play_selected_song() {
			var t;
			$('#playlist a').each(function() {
				if ($(this).hasClass('selected')) {
					t = $(this).attr('data-song-number');
				}
			});
			load_song(t);
		}
		
	});
})(jQuery)