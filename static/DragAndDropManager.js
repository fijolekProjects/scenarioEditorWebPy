/**
 * Handles drag and drop events like dragging icons into the map
 */
$(document).ready(function () {
    var DragAndDropManager = {
        makeQuestIconDraggable: function () {
            $('#quest_icon_id').draggable({
                revert: true
            });
        }(),

        makeInfoIconDraggable: function () {
            $('#info_icon_id').draggable({
                revert: true
            });
        }(),

        makeTaskIconDraggable: function () {
            $('#task_icon_id').draggable({
                revert: true,
                appendTo: 'body',
                helper: "clone"
            });
        }(),

        handleQuestDropped: function (latlng) {
            MenuManager.cleanForms();
            MarkerFactory.createQuestMarker(latlng);
            MenuManager.goToQuestFormTab();
        },

        handleInfoDropped: function (latlng) {
            MenuManager.cleanForms();
            MarkerFactory.createInfoMarker(latlng);
            MenuManager.goToInfoFormTab();
        },

        handleTaskDropped: function (latlng) {
            MarkerFactory.createTaskMarkerWithCircle(latlng);
        },

        handleDropOnGoogleMap: function () {
            $('#google_map').droppable({
                drop: function (event, ui) {
                    var droppedElementHandlers = {
                        "quest_icon_id": DragAndDropManager.handleQuestDropped,
                            "info_icon_id": DragAndDropManager.handleInfoDropped,
                            "task_icon_id": DragAndDropManager.handleTaskDropped
                    };
                    var draggableId = ui.draggable.attr("id");
                    var point = new google.maps.Point(event.pageX, event.pageY);
                    var latlng = mapVariables.overlay.getProjection()
                        .fromContainerPixelToLatLng(point);

                    var currentElementHandler = droppedElementHandlers[draggableId];
                    if ($.isFunction(currentElementHandler)) {
                        currentElementHandler(latlng);
                    }
                }
            });
        }()
    };
});