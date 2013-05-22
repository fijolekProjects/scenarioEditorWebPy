
var map;
var overlay;

var componentCounter = -1;
var taskCircleArray = [];
var componentArray = [];
var queryStringsArr = [];

function initialize() {
	var myCenter = new google.maps.LatLng(52.21927287, 21.01122236);
    var mapProp = {
        center: myCenter,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("google-map"), mapProp);
    overlay = new google.maps.OverlayView();
    overlay.draw = function () {};
    overlay.setMap(map);

    var marker = new google.maps.Marker({
        position: myCenter,
        animation: google.maps.Animation.BOUNCE
    });
    marker.setMap(map);

    var weiti = new google.maps.Circle({
        center: myCenter,
        radius: 100,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.4,
        map: map,
    });

    google.maps.event.addListener(marker, 'click', function () {
        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent("<p>WEITI<br />" + "Lat = " + myCenter.lat() + "<br />" + "Lng = " + myCenter.lng() + "<br />" + "Radius = " + weiti.radius + "<br/>" + "Kliknij na mape by dodac nowy taskMarker " + "<br />" + "Nastepnie kliknij na taskMarker PP myszy" + "<br />" + "Usuwanie markera double click" + "</p>");
        infoWindow.open(map, marker);
    });


}
<!-- initialize -->

function abstractMarkerClass(location, markerProp) {
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

    google.maps.event.addListener(abstractMarkerObj, 'rightclick', function () {
        abstractMarkerObj.setMap(null);
    });

    google.maps.event.addListener(abstractMarkerObj, 'drag', function (event) {
        document.getElementById(abstractMarkerObj.latString).value = event.latLng.lat();
        document.getElementById(abstractMarkerObj.lngString).value = event.latLng.lng();
    });

    function putLatLngToForm() {
        document.getElementById(abstractMarkerObj.latString).value = abstractMarkerObj.position.lat();
        document.getElementById(abstractMarkerObj.lngString).value = abstractMarkerObj.position.lng();
    }

    putLatLngToForm();

    return abstractMarkerObj;
}


function componentMarkerClass(location, markerProp) {
    componentCounter++;

    function putComponentIdToForm() {
        document.getElementById(markerObj.idString).value = componentCounter;
    }

    var createMarkerObj = function () {
        var concreteMarkerObj = abstractMarkerClass(location, markerProp);
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
            goToSpecificTab(markerObj.formID);
            $(".radioCheckedTrue").each(function () {
            	if ($(this).is(':checked')) {
            		var elem = $("ol.formset", $(this).parent());
            		elem.slideDown('fast');
            	}
            });
        } else {
            putComponentIdToForm();
            goToSpecificTab(markerObj.formID);
        }
    });

    putComponentIdToForm();
    componentArray.push(markerObj);

    return markerObj;
}


function createQuestMarker(location) {
    var questImage = 'static/icons/questIcon.png';
    var markerStrings = ["latitude", "longitude", "id", "questForm"];
    var questMarkerObj = componentMarkerClass(location, markerStrings);
    questMarkerObj.icon = questImage;
    questMarkerObj.formID = 0;
    return questMarkerObj;
}


function createInfoMarker(location) {
    var infoImage = 'static/icons/infoIcon.png';
    var markerStrings = ["info_latitude", "info_longitude", "info_id", "infoForm"];
    var infoMarkerObj = componentMarkerClass(location, markerStrings);
    infoMarkerObj.icon = infoImage;
    infoMarkerObj.formID = 1;
    return infoMarkerObj;
}


function circleClass(taskPosition) {
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

function taskMarkerClass(location) {
    var taskImage = 'static/icons/taskIcon.png';
    var taskMarkerStrings = ["location_latitude", "location_longitude"];
    var taskMarkerObj = abstractMarkerClass(location, taskMarkerStrings);
    taskMarkerObj.icon = taskImage;

    google.maps.event.addListener(taskMarkerObj, 'rightclick', function () {
        document.getElementById(taskMarkerObj.latString).value = null;
        document.getElementById(taskMarkerObj.lngString).value = null;
    });

    return taskMarkerObj;
}


function taskCircleClass(taskPosition) {
    var taskCircle = circleClass(taskPosition);
    taskCircleArray.push(taskCircle);
    return taskCircle;
}

function markerWithCircle(location, idString, radiusString) {
    var taskMarker = taskMarkerClass(location);
    var taskPosition = taskMarker.position;
    var taskCircle = taskCircleClass(taskPosition);

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
    markerWithCircle(location, "id", "location_radius");
}

google.maps.event.addDomListener(window, 'load', initialize);