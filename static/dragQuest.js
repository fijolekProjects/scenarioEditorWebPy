$(document).ready(function() {
	
	$('#questIconId').draggable({
				revert : true
			});
	$('#taskIconId').draggable({
				revert : true
			});		
			
	$('#google-map').droppable({
		drop : function(e, ui) {
			var draggableId = ui.draggable.attr("id");
			var point = new google.maps.Point(e.pageX, e.pageY);
			var latlng = overlay.getProjection()
					.fromContainerPixelToLatLng(point);
			if (draggableId === "questIconId") {
			placeQuestMarker(latlng);
			$('#tabs').tabs('enable', 1).tabs('select', 1); 
			}
			else if (draggableId === "taskIconId") {
				placeTaskMarker(latlng);
			}
			
			
			
		}
	});
});


