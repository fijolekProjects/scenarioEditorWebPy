function cleanForms() {
    hideFormFields();
    $("#quest_form").get(0).reset();
    $("#info_form").get(0).reset();

}

function hideFormFields() {
    $("#tasks_location_parent, #tasks_text_parent, #tasks_choice_parent, #hints_parent").css("display", "none");
}
function goToFormTab() {
	$('#tabs').tabs('enable', 1).tabs('select', 1);
}

function goToQuestFormTab() {
	goToFormTab();
	$("#accordion").accordion("activate", 0);
}

function goToInfoFormTab() {
	goToFormTab();
	$("#accordion").accordion("activate", 1);
}
function goToChooseComponentTab() {
	$('#tabs').tabs('enable', 0).tabs('select', 0);
}

function goToSpecificTab(formID) {
	goToFormTab();
	$("#accordion").accordion("activate", formID);
}