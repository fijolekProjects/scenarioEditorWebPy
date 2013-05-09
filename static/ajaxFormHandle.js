var questFormData = 1;
$(document).ready(function () {
	
    $(".button").click(function () {
    	questFormData = $("form").serialize();
    	var currentId = $('#id').val();
    	markersArray[currentId]["queryString"] = questFormData;
        $.ajax({
            type: "POST",
            async: false,
            data: questFormData,
            success: function (data) {
                $('#result').html(data).hide().fadeIn(1500);
                cleanForms();
                $('#tabs').tabs('enable', 0).tabs('select', 0);
                $("#task_location_parent").css("display", "none");
                $('input[name=task_location]:checked').val() == "No";
            },
        });
        return false;
    });
    
});

