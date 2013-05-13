
$(document).ready(function () {
	var queryStringsArr = [];
	
	
    $(".formButton").click(function () {
    	var serializedForm = $("form").serialize();
    	var currentId = $('#id').val();
    	componentArray[currentId]["queryString"] = serializedForm;
    	queryStringsArr.push(serializedForm);
    	cleanForms();
    	goToChooseComponentTab();
    	$("#remove_answer_button").click();
        $.ajax({
            async: false,
        });
        return false;
    });
    
    $(".scenarioButton").click(function () {
    	var wholeQueryString = "";
    	for (var i = 0; i < queryStringsArr.length; i++) {
		
    		wholeQueryString += queryStringsArr[i] + "&EOS= " + i + "&";
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

