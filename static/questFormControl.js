$(document).ready(function () {
    hideFormFields();
    $(':radio').on('click', function () {
        var elem = $("ol.formset", $(this).parent());
        if ($(this).val() === "Yes") {
            elem.slideDown('fast');
        }
        else {
            elem.slideUp('fast');
        }
    });
    var choiceQuestion = '<ul><li><label for="choice_answer">answer/success code</label><input type="text" id="quest_task_choice_answer" name="choice_answer_param" /><input type="number" id="quest_task_choice_success_code" name="successCode"/></li></ul>';
	    
    $("#add_answer_button").click(function(){
    	$("#quest_task_choice_parent").append(choiceQuestion);
    	});
    $("#remove_answer_button").click(function(){
    	$("#quest_task_choice_parent").children("ul").remove();
    	});
    
});
