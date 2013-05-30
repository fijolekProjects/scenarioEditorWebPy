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
    	MenuManager.cleanForms();
        MarkerFactory.createQuestMarker(latlng);
        MenuManager.goToQuestFormTab();
    }

    function handleInfoDropped(latlng) {
    	MenuManager.cleanForms();
        MarkerFactory.createInfoMarker(latlng);
        MenuManager.goToInfoFormTab();
    }

    function handleTaskDropped(latlng) {
    	MarkerFactory.createTaskMarkerWithCircle(latlng);
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