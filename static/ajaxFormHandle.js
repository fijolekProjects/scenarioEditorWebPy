
$(document).ready(function () {
	var queryStringsArr = [];
	
	
    $(".formButton").click(function () {
    	var serializedForm = $("form").serialize();
    	var currentId = $('#id').val();
    	markersArray[currentId]["queryString"] = serializedForm;
    	queryStringsArr.push(serializedForm);
    	cleanForms();
    	goToChooseComponentTab();
        $.ajax({
            async: false,
        });
        return false;
    });
    
    $(".scenarioButton").click(function () {
    	var wholeQueryString = "";
    	for (var i = 0; i < queryStringsArr.length; i++) {
    		wholeQueryString += queryStringsArr[i] + "EOS";
    	}
    	alert(wholeQueryString);
        $.ajax({
            type: "POST",
            async: false,
            data: wholeQueryString,
            success: function (data) {
                $('#result').html(data).hide().fadeIn(1500);
                
            },
        });
        return false;
    });
});

