$(document).ready(function() {
	$('#questIconId').draggable({
				revert : true
			});
	$('#googleMap').droppable({
		drop : function(e) {
			var point = new google.maps.Point(e.pageX, e.pageY);
			var latlng = overlay.getProjection()
					.fromContainerPixelToLatLng(point);
			placeQuestMarker(latlng);
		
			
		}
	});
});