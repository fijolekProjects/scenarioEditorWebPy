$(document).ready(function () {
	function handleClickComponentButtonEvent(buttonId, fileInputClass, formId, componentID) {
		$(buttonId).click(function () {
	    	 $(fileInputClass).each(function () {
	    		 var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
	    		 $(":input:eq(" + ($(":input").index($(this)) + 1) + ")").val(fileName);
	    	 });
	    	
	    	var serializedForm = $(formId).serialize();
	    	var currentId = $(componentID).val();
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
	}
    
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
    
    handleClickComponentButtonEvent("#questButton", ".questFileInput", "#questForm", '#id');
	handleClickComponentButtonEvent("#infoButton", ".infoFileInput", "#infoForm", '#info_id');
});

