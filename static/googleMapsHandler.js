var map;
var overlay;

var componentCounter = -1;
var taskCircleArray = [];
var componentArray = [];
var queryStringsArr = [];
var taskArray = [];
var allComponentIdsArray = ["quest_id", "info_id"];


/**
 * Google map initialization, setting map and its properties like center, zoom etc.
 * @namespace Initialize Function
 */
function initialize() {
    /**
     * Center of google map
     */
    var myCenter = new google.maps.LatLng(52.21927287, 21.01122236);
    /**
     * Properties of map
     */
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

var initializeMap = function () {
    google.maps.event.addDomListener(window, 'load', initialize);
}();

/**
 * The most abstract class for MarkerObject <br> It implements events: <br>
 * - 'rightclick' deletes the marker <br>
 * - 'drag' changes latitude/longitude at Marker specific fields in form
 * @namespace MarkerClass
 * @param location usually event coordinates in google map, Marker is created at that specific place
 * @param markerProp marker properties <br>
 * markerProp[0] = latitude name in form <br>
 * markerProp[1] = longitude name in form <br>
 * @returns MarkerWithLabel
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
        lngString: markerProp[1]
    });
    /**
     * Removes marker with 'right click'
     */
    var removeMarker = function () {
        google.maps.event.addListener(abstractMarkerObj, 'rightclick', function () {
            abstractMarkerObj.setMap(null);
        });
    }();

    /**
     * Dragging marker updates form coordinates
     */
    var dragMarker = function () {
        google.maps.event.addListener(abstractMarkerObj, 'drag', function (event) {
            var currentId = returnCurrentId(allComponentIdsArray);
            var currentMarkerId = parseInt(abstractMarkerObj.labelContent);
            if (currentId === currentMarkerId) {
                document.getElementById(abstractMarkerObj.latString).value = event.latLng.lat();
                document.getElementById(abstractMarkerObj.lngString).value = event.latLng.lng();
            }
        });
    }();

    /**
     * Puts latitude/longitude to form
     */
    var putLatLngToForm = function () {
        document.getElementById(abstractMarkerObj.latString).value = abstractMarkerObj.position.lat();
        document.getElementById(abstractMarkerObj.lngString).value = abstractMarkerObj.position.lng();
    }();
    /**
     * Returs current id during filling the form. <br>
     * It looks for allComponentIdsArray element which value in form is different than NaN and returns it
     * @param allComponentIdsArray is all form ids like 'quest_id', 'info_id'
     * @returns id of current form
     */
    function returnCurrentId(allComponentIdsArray) {
        for (var i = 0; i < allComponentIdsArray.length; i++) {
            var potentialCurrentId = parseInt(document.getElementById(allComponentIdsArray[i]).value);
            if (!isNaN(potentialCurrentId)) {
                return potentialCurrentId;
            }
        }
    }
    return abstractMarkerObj;
}

/**
 * Abstract Class that represents Component Marker
 * It adds properties like: <br>
 * markerProp[2] = id of id in form (quest_id or info_id)<br>
 * markerProp[3] = id of form <br>
 * @namespace MarkerClass
 * @param location
 * @param markerProp
 * @extends AbstractMarkerClass
 * @returns Component Marker
 */
function ComponentMarkerClass(location, markerProp) {
    componentCounter++;
    /**
     * Creates AbstractMarker and adds new properties to it
     */
    var markerObj = function () {
        var concreteMarkerObj = AbstractMarkerClass(location, markerProp);
        concreteMarkerObj.queryString = 0;
        concreteMarkerObj.idString = markerProp[2];
        concreteMarkerObj.formString = markerProp[3];
        concreteMarkerObj.formId = 0;
        return concreteMarkerObj;
    }();
    /**
     * Removes Component Marker after 'right click' event
     */
    var removeMarker = function () {
        google.maps.event.addListener(markerObj, 'rightclick', function () {
            var componentIndexToRemove = parseInt(markerObj.labelContent);
            queryStringsArr.splice(componentIndexToRemove, 1);
            componentCounter--;
            MenuManager.goToChooseComponentTab();
            MenuManager.cleanForms();
        });
    }();
    /**
     * Handles Component Marker click event
     */
   
        google.maps.event.addListener(markerObj, 'click', function (event) {
            if (markerObj.queryString !== 0) {
                var $form = $("#".concat(markerObj.formString));
                var formSerializedData = markerObj.queryString;
                MenuManager.cleanForms();
                $form.deserialize(formSerializedData);
                MenuManager.goToConcreteForm(markerObj.formID);
                $(".radio_checked_true").each(function () {
                    if ($(this).is(':checked')) {
                        var elem = $("ol.formset", $(this).parent());
                        elem.slideDown('fast');
                    }
                });
            } else {
                putComponentIdToForm();
                MenuManager.goToConcreteForm(markerObj.formID);
            }
        });
   

    /**
     * Puts Component Id to concrete form (quest_id or info_id)
     */
    var putComponentIdToForm = function () {
        document.getElementById(markerObj.idString).value = componentCounter;
    }();

    componentArray.push(markerObj);
    return markerObj;
}


/**
 * Class that represents Circle that will be bind to TaskMarker
 * @namespace Circle class
 */
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
        map: map
    });
    return circleObj;
}
/**
 * Class that represents Task Marker at given position <br>
 * adds icon property to Abstract Marker
 * @namespace TaskMarkerClass
 * @param location of Task Marker
 * @returns Task Marker
 */
function TaskMarkerClass(location) {
    var taskImage = 'static/icons/taskIcon.png';
    var taskMarkerStrings = ["quest_task_location_latitude", "quest_task_location_longitude"];
    var taskMarkerObj = AbstractMarkerClass(location, taskMarkerStrings);
    taskMarkerObj.icon = taskImage;
    /**
     * Removes Task Marker after 'right click' event
     */
    var removeMarker = function () {
        google.maps.event.addListener(taskMarkerObj, 'rightclick', function () {
            document.getElementById(taskMarkerObj.latString).value = null;
            document.getElementById(taskMarkerObj.lngString).value = null;
        });
    }();

    taskArray.push(taskMarkerObj);
    return taskMarkerObj;
}

/**
 * Class that represents Circle at given position
 * @namespace TaskCircleClass
 * @param taskPosition position of task to bind with
 * @returns Task Circle
 */
function TaskCircleClass(taskPosition) {
    var taskCircle = CircleClass(taskPosition);
    taskCircleArray.push(taskCircle);
    return taskCircle;
}
/**
 * Class that represents Marker with Circle binded to id
 * @namespace MarkerWithCircleClass
 * @param location location of Marker/Circle
 * @param idString id of id in form
 * @param radiusString id of radius in form
 */
function MarkerWithCircleClass(location, idString, radiusString) {
    var taskMarker = TaskMarkerClass(location);
    var taskPosition = taskMarker.position;
    var taskCircle = TaskCircleClass(taskPosition);

    /**
     * Handles changing radius in form <br>
     * User sees changes immediately on the map
     */
    var changeRadiusHandler = function () {
        google.maps.event.addDomListener(
        $("#".concat(radiusString)).bind('input', function () {
            var currentTaskId = parseInt(document.getElementById(idString).value);
            for (var i = 0; i < taskCircleArray.length; i++) {
                if (currentTaskId === (taskCircleArray[i]["circleId"])) {
                    taskCircleArray[i].bindTo('center', taskArray[currentTaskId], 'position');
                    taskCircleArray[i].setRadius(parseInt(document.getElementById(radiusString).value));
                }
            }
        }));
    }();
    /**
     * Removes marker with circle after 'right click' event
     */
    var removeMarkerWithCircle = function () {
        google.maps.event.addListener(taskMarker, 'rightclick', function () {
            taskCircle.setMap(null);
            document.getElementById(radiusString).value = null;
        });
    }();
}

/**
 * Factory that produces marker at given location
 * It produces: <br>
 * QuestMarker <br>
 * InfoMarker <br>
 * TaskMarkerWithCircle <br>
 * @namespace Marker Factory
 * @param location of marker
 * @example Usage: MarkerFactory.createQuestMarker(latlng);
 */
var MarkerFactory = {
    createQuestMarker: function (location) {
        var questImage = 'static/icons/questIcon.png';
        var markerStrings = ["quest_latitude", "quest_longitude", "quest_id", "quest_form"];
        var questMarkerObj = ComponentMarkerClass(location, markerStrings);
        questMarkerObj.icon = questImage;
        questMarkerObj.formID = 0;
        return questMarkerObj;
    },

    createInfoMarker: function (location) {
        var infoImage = 'static/icons/infoIcon.png';
        var markerStrings = ["info_latitude", "info_longitude", "info_id", "info_form"];
        var infoMarkerObj = ComponentMarkerClass(location, markerStrings);
        infoMarkerObj.icon = infoImage;
        infoMarkerObj.formID = 1;
        return infoMarkerObj;
    },

    createTaskMarkerWithCircle: function (location) {
        MarkerWithCircleClass(location, "quest_id", "quest_task_location_radius");
    },
}