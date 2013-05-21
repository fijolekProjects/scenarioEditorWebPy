$(document).ready(function () {
    $('#questIconId').draggable({
        revert: true

    });
    $('#infoIconId').draggable({
        revert: true

    });
    $('#taskIconId').draggable({
        revert: true,
        appendTo: 'body',
        helper: "clone",
    });

    $('#google-map').droppable({
        drop: function (e, ui) {
            var draggableId = ui.draggable.attr("id");
            var point = new google.maps.Point(e.pageX, e.pageY);
            var latlng = overlay.getProjection()
                .fromContainerPixelToLatLng(point);
            if (draggableId === "questIconId") {
            	createQuestMarker(latlng);
                //placeQuestMarker(latlng);
                goToQuestFormTab();
            } else if (draggableId === "infoIconId") {
                //placeInfoMarker(latlng)
            	createInfoMarker(latlng);
                goToInfoFormTab();
            } else if (draggableId === "taskIconId") {
            	createTaskMarkerWithCircle(latlng);
            }

        }
    });
});