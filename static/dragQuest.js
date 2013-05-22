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

    function handleQuestDropped(latlng) {
        createQuestMarker(latlng);
        goToQuestFormTab();
    }

    function handleInfoDropped(latlng) {
        createInfoMarker(latlng);
        goToInfoFormTab();
    }

    function handleTaskDropped(latlng) {
        createTaskMarkerWithCircle(latlng);
    }

    var droppedElementHandlers = {
        "questIconId": handleQuestDropped,
        "infoIconId": handleInfoDropped,
        "taskIconId": handleTaskDropped,
    }


    $('#google-map').droppable({
        drop: function (event, ui) {
            var draggableId = ui.draggable.attr("id");
            var point = new google.maps.Point(event.pageX, event.pageY);
            var latlng = overlay.getProjection()
                .fromContainerPixelToLatLng(point);

            var currentElementHandler = droppedElementHandlers[draggableId];
            if ($.isFunction(currentElementHandler)) {
                currentElementHandler(latlng);
            }
        }
    });
});