
var map;
var overlay;

var componentCounter = -1;
var taskCircleArray = [];
var componentArray = [];
var queryStringsArr = [];
/**
 * Google map initialization, setting map and its properties like center, zoom etc.
 * @returns
 */
function initialize() {
	var myCenter = new google.maps.LatLng(52.21927287, 21.01122236);
    var mapProp = {
        center: myCenter,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("google_map"), mapProp);
    overlay = new google.maps.OverlayView();
    overlay.draw = function () {};
    overlay.setMap(map);

}

/**
 * The most abstract class for MarkerObject <br> It implements events: <br>
 * - 'rightclick' deletes the marker <br>
 * - 'drag' changes latitude/longitude at Marker specific fields in form
 * @namespace MarkerClass
 * @param location usually event coordinates in google map, Marker is created at that specific place
 * @param markerProp marker properties <br>
 * markerProp[0] = latitude name in form <br>
 * markerProp[1] = longitude name in form <br>
 * @returns {MarkerWithLabel}
 */
function AbstractMarkerClass(location, markerProp) {
	/**
	 * Base marker Object
	 */
    var abstractMarkerObj = new MarkerWithLabel({
        position: location,
        map: map,
        draggable: true,
        icon: '',
        labelContent: componentCounter.toString(),
        labelClass: "labels",
        labelAnchor: new google.maps.Point(14, -5),
        latString: markerProp[0],
        lngString: markerProp[1],
    });
    /**
     * 
     */
    google.maps.event.addListener(abstractMarkerObj, 'rightclick', function () {
        abstractMarkerObj.setMap(null);
    });
    /**
     * Dragging marker updates form coordinates
     */
    google.maps.event.addListener(abstractMarkerObj, 'drag', function (event) {
        document.getElementById(abstractMarkerObj.latString).value = event.latLng.lat();
        document.getElementById(abstractMarkerObj.lngString).value = event.latLng.lng();
    });
    /**
     * Puts latitude/longitude to form
     */
    function putLatLngToForm() {
        document.getElementById(abstractMarkerObj.latString).value = abstractMarkerObj.position.lat();
        document.getElementById(abstractMarkerObj.lngString).value = abstractMarkerObj.position.lng();
    }

    putLatLngToForm();

    return abstractMarkerObj;
}

/**
 * @namespace MarkerClass
 * @param location
 * @param markerProp
 * @returns
 */
function ComponentMarkerClass(location, markerProp) {
    componentCounter++;

    function putComponentIdToForm() {
        document.getElementById(markerObj.idString).value = componentCounter;
    }

    var createMarkerObj = function () {
        var concreteMarkerObj = AbstractMarkerClass(location, markerProp);
        concreteMarkerObj.queryString = 0;
        concreteMarkerObj.idString = markerProp[2];
        concreteMarkerObj.formString = markerProp[3];
        concreteMarkerObj.formId = 0;
        return concreteMarkerObj;
    }

    var markerObj = createMarkerObj();

    google.maps.event.addListener(markerObj, 'rightclick', function () {
        var componentIndexToRemove = parseInt(markerObj.labelContent)
        queryStringsArr.splice(componentIndexToRemove, 1);
        componentCounter--;
        goToChooseComponentTab();
        cleanForms();

    });

    google.maps.event.addListener(markerObj, 'click', function (event) {
        if (markerObj.queryString !== 0) {
            var $form = $("#".concat(markerObj.formString))
            var formSerializedData = markerObj.queryString;
            cleanForms();
            $form.deserialize(formSerializedData);
            goToSpecificFormTab(markerObj.formID);
            $(".radio_checked_true").each(function () {
            	if ($(this).is(':checked')) {
            		var elem = $("ol.formset", $(this).parent());
            		elem.slideDown('fast');
            	}
            });
            
        } else {
            putComponentIdToForm();
            goToSpecificFormTab(markerObj.formID);
        }
    });

    putComponentIdToForm();
    componentArray.push(markerObj);

    return markerObj;
}


function createQuestMarker(location) {
    var questImage = 'static/icons/questIcon.png';
    var markerStrings = ["quest_latitude", "quest_longitude", "quest_id", "quest_form"];
    var questMarkerObj = ComponentMarkerClass(location, markerStrings);
    questMarkerObj.icon = questImage;
    questMarkerObj.formID = 0;
    return questMarkerObj;
}


function createInfoMarker(location) {
    var infoImage = 'static/icons/infoIcon.png';
    var markerStrings = ["info_latitude", "info_longitude", "info_id", "info_form"];
    var infoMarkerObj = ComponentMarkerClass(location, markerStrings);
    infoMarkerObj.icon = infoImage;
    infoMarkerObj.formID = 1;
    return infoMarkerObj;
}


function CircleClass(taskPosition) {
    var circleObj = new google.maps.Circle({
        center: taskPosition,
        radius: 0,
        circleId: componentCounter,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4,
        map: map,
    });
    return circleObj;
}

function TaskMarkerClass(location) {
    var taskImage = 'static/icons/taskIcon.png';
    var taskMarkerStrings = ["quest_task_location_latitude", "quest_task_location_longitude"];
    var taskMarkerObj = AbstractMarkerClass(location, taskMarkerStrings);
    taskMarkerObj.icon = taskImage;

    google.maps.event.addListener(taskMarkerObj, 'rightclick', function () {
        document.getElementById(taskMarkerObj.latString).value = null;
        document.getElementById(taskMarkerObj.lngString).value = null;
    });

    return taskMarkerObj;
}


function TaskCircleClass(taskPosition) {
    var taskCircle = CircleClass(taskPosition);
    taskCircleArray.push(taskCircle);
    return taskCircle;
}

function markerWithCircle(location, idString, radiusString) {
    var taskMarker = TaskMarkerClass(location);
    var taskPosition = taskMarker.position;
    var taskCircle = TaskCircleClass(taskPosition);

    google.maps.event.addDomListener(
    document.getElementById(radiusString), 'change', function () {
        var currentTaskId = parseInt(document.getElementById(idString).value);
        for (var i = 0; i < taskCircleArray.length; i++) {
            if (currentTaskId === (taskCircleArray[i]["circleId"])) {
                taskCircleArray[i].bindTo('center', taskMarker, 'position');
                taskCircleArray[i].setRadius(parseInt(document.getElementById(radiusString).value))
            }
        }
    });

    google.maps.event.addListener(taskMarker, 'rightclick', function () {
        taskCircle.setMap(null);
        document.getElementById(radiusString).value = null;
    });

}

function createTaskMarkerWithCircle(location) {
    markerWithCircle(location, "quest_id", "quest_task_location_radius");
}

google.maps.event.addDomListener(window, 'load', initialize);
