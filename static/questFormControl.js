$(document).ready(function () {
    hideFormFields();
    $(':radio').on('click', function () {
        var elem = $("ol.formset", $(this).parent());
        if ($(this).val() === "Yes")
            elem.slideDown('fast');
        else
            elem.slideUp('fast');
    });
    var choiceQuestion = '<ul><li><label for="choice_answer">answer/success code</label><input type="text" id="choice_answer" name="choice_answer" /><input type="number" id="choice_success_code" name="choice_success_code"/></li></ul>';
	    
    $("#add_answer_button").click(function(){
    	$("#tasks_choice_parent").append(choiceQuestion);
    	});
    $("#remove_answer_button").click(function(){
    	$("#tasks_choice_parent").children("ul").remove();
    	});
    
});