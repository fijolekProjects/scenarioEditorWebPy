function cleanForms() {
	hideFormFields();
	$("form").find("input[type = text], input[type = number]").val('');	
	$("input:radio").removeAttr("checked");
	
}
function hideFormFields() {
	$("#tasks_location_parent, #tasks_text_parent, #tasks_choice_parent, #hints_parent").css("display", "none");
}