
$(document).ready(function () {
	
	
    $("#questButton").click(function () {
    	 $(".questFileInput").each(function () {
    		 var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
    		 $(":input:eq(" + ($(":input").index($(this)) + 1) + ")").val(fileName);
    	 });
    	
    	var serializedForm = $("#questForm").serialize();
    	var currentId = $('#id').val();
    	componentArray[currentId]["queryString"] = serializedForm;
    	alert(serializedForm);
    	queryStringsArr.push(serializedForm);
    	cleanForms();
    	goToChooseComponentTab();
    	$("#remove_answer_button").click();
        $.ajax({
            async: false,
        });
        return false;
    });
    
    $("#infoButton").click(function () {
   	 $(".infoFileInput").each(function () {
   		 var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
   		 $(":input:eq(" + ($(":input").index($(this)) + 1) + ")").val(fileName);
   	 });
   	
   	var serializedForm = $("#infoForm").serialize();
   	var currentId = $('#info_id').val();
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

