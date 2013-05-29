$(document).ready(function () {
    $('#quest_icon_id').draggable({
        revert: true

    });
    $('#info_icon_id').draggable({
        revert: true

    });
    $('#task_icon_id').draggable({
        revert: true,
        appendTo: 'body',
        helper: "clone",
    });

    function handleQuestDropped(latlng) {
    	cleanForms();
        createQuestMarker(latlng);
        goToQuestFormTab();
    }

    function handleInfoDropped(latlng) {
    	cleanForms();
        createInfoMarker(latlng);
        goToInfoFormTab();
    }

    function handleTaskDropped(latlng) {
        createTaskMarkerWithCircle(latlng);
    }

    var droppedElementHandlers = {
        "quest_icon_id": handleQuestDropped,
        "info_icon_id": handleInfoDropped,
        "task_icon_id": handleTaskDropped,
    }


    $('#google_map').droppable({
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