function cleanForms() {
    hideFormFields();
    $("#questForm").get(0).reset();
    $("#infoForm").get(0).reset();

}

function hideFormFields() {
    $("#tasks_location_parent, #tasks_text_parent, #tasks_choice_parent, #hints_parent").css("display", "none");
}