function cleanForms() {
    hideFormFields();
    $("#quest_form").get(0).reset();
    $("#info_form").get(0).reset();

}

function hideFormFields() {
    $("#quest_task_location_parent, #quest_task_text_parent, #quest_task_choice_parent, #quest_task_hints_parent").css("display", "none");
}
function goToFormTab() {
	$('#tabs').tabs('enable', 1).tabs('select', 1);
}

function goToQuestFormTab() {
	goToSpecificFormTab(0);
}

function goToInfoFormTab() {
	goToSpecificFormTab(1);
}

function goToChooseComponentTab() {
	$('#tabs').tabs('enable', 0).tabs('select', 0);
}

function goToSpecificFormTab(formID) {
	goToFormTab();
	$("#accordion").accordion("activate", formID);
}