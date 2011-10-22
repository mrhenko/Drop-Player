(function ($) { 
	$(document).ready(function() {
		/* Basics */
		var api = 'apps/api.php';
		
		
		/* Load songs */
		$('#load-songs').click(function(e){
			e.preventDefault();
			$.ajax({
				url: api + '?api=load_songs',
				context: document.body,
				success: function(result) {
					//console.log(result);
					var song_list = $.parseJSON(result);
					$(song_list).each(function(i, val) {
						$('#song-list').append('<li>' + val + '</li>');
					});
				}
			});
		});
		
	});
})(jQuery)