(function ($) { 
	$(document).ready(function() {
		/* Basics */
		var api = 'apps/api.php';
		/*var song_list;
		var audioplayer = $('#audioplayer').get(0);
		var currenttrack;*/
		var currentposition = $('#position').get(0);
		/*var totaltracks;*/
		
		/* An object for the player */
		var player = {
			/* Properties */
			element : document.getElementById('audioplayer'),
			playlist: {},
			nowPlaying: 0,
			randomize: false,

			/* Methods */
			playpause: function() {
				if (this.element.paused) {
					$('#playpause').removeClass('play').addClass('pause');
					this.element.play();
				} else {
					$('#playpause').removeClass('pause').addClass('play');
					this.element.pause();
				}
			},
			
			loadSongsToPlaylist: function() {
				var temp = this;
				$.ajax({
					url: api + '?api=load_songs',
					context: document.body,
					success: function(result) {
						temp.playlist = $.parseJSON(result);
						temp.ui.displayPlaylist(temp.playlist);
						temp.cueSongNumber(0);
					}
				});
			},
			
			cueSongNumber: function(t) {
				/* Is it set to randomize? */
				if (this.randomize) {
					t = Math.floor(Math.random()* this.playlist.length);
					while (t == this.nowPlaying) {
						track = Math.floor(Math.random()* this.playlist.length);
					}
				}
				
				this.element.innerHTML = '<source src=\'music/' + this.playlist[t] + '\' />';
				$('#current-song span#songtitle').html(this.playlist[t]);
				this.nowPlaying = t;
				$('#length').html(min_sec(this.element.duration));
			},
			
			nextSong: function() {
				var new_t = this.nowPlaying + 1;
				this.cueSongNumber(new_t);
			},
			
			/* The player's UI */
			ui: {
				playlist: document.getElementById('list'),
				
				/* Methods */
				displayPlaylist: function(list) {
					var newhtml = '';
					var i = 0;
					for (var key in list) {
						newhtml = newhtml + '<li><a href="#" data-song-number="' + i + '">' + list[key] + '</a></li>';
						i++;
					}
					this.playlist.innerHTML = newhtml;
				}
			}
		}
		
		console.log(player);
		
		/* Bindings */
		
		/* Stop */
		$('#stop').click(function(e) {
			e.preventDefault();
			audioplayer.pause();
			audioplayer.currentTime = 0;
		});
		
		/* Play/pause */
		$('#playpause').click(function(e){
			e.preventDefault();
			player.playpause();
		});
		
		/* Skip */
		$('#next').click(function(e){
			e.preventDefault();
			player.nextSong();
		});
		
		/* Toggle randomize */
		var toggleRandom = document.getElementById('random');
		toggleRandom.addEventListener('click', function(){player.randomize = this.checked;});
		
		/* Position update */
		$(audioplayer).bind('timeupdate', function(){
			var position = Math.round(audioplayer.currentTime);
			$(currentposition).html(min_sec(position));
			
			move_playhead(position);
			
			/* If the track ends */
			if (position >= Math.round(audioplayer.duration)) {
				/* Next track */
				player.nextSong();
				player.loadSongsToPlaylist();
			}
		});
		
		/* A song is selected in the playlist */
		$('#playlist a').live('click', function(e){
			e.preventDefault();
			$('#playlist a').removeClass('selected');
			$(this).addClass('selected');
			play_selected_song();
		});
		
			
		/*function show_song_list() {
			$('#playlist ul').html('');
			$(song_list).each(function(i, val) {
				$('#playlist ul').append('<li><a href="#" data-song-number="' + i + '">' + val + '</a></li>');
			});
		}*/
				
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
		
		/* Convert time to min:sec */
		function min_sec(t) {
			var min = Math.floor(t / 60,10);
 			var sec = t - min * 60;
 			if (sec < 10) {
 				sec = '0' + sec;
 			}
			var ms = min + ':' + sec;
			return ms;
		}
		
		/* Move the playhead */
		function move_playhead(pos) {
			var secwidth = 100 / audioplayer.duration;
			var newpos = secwidth * pos;
			$('#position').css('margin-left', newpos + '%');
		}
		
		
		/* Some behaviour for small screens */
		var w = $(window);
		if ((w.width() < 480) && (w.height() < 480)) {
			$('body').css('height', w.height()).css('overflow', 'hidden');
			$('#playlist').css('top', w.height()).css('position', 'absolute');
			
			$('.show-playlist a').click(function(e){
				e.preventDefault();
				$('#playlist').addClass('animate');
				$('#playlist').css('top', '0');
				$('body').css('overflow', 'auto');
			});
		}
		
		
		/* Initialize */
		player.loadSongsToPlaylist();
		
	});
})(jQuery)