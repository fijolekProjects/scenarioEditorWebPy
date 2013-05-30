//var FormManager = {
//		hideFormFields: function() {
//			$("#quest_task_location_parent, #quest_task_text_parent, #quest_task_choice_parent, #quest_task_hints_parent").css("display", "none");
//		},
//		
//		cleanForms: function() {
//			this.hideFormFields();
//		    $("#quest_form").get(0).reset();
//		    $("#info_form").get(0).reset();
//		},
//		
//		goToFormTab: function() {
//			$('#tabs').tabs('enable', 1).tabs('select', 1);
//		},
//		
//		goToConcreteForm: function(formId) {
//			this.goToFormTab();
//		    $("#accordion").accordion("activate", formID);
//		},
//		
//		goToChooseComponentTab: function() {
//			$('#tabs').tabs('enable', 0).tabs('select', 0);
//		},
//		
//		goToQuestFormTab: function() {
//			var questFormId = 0;
//			this.goToConcreteForm(0);
//		},
//		
//		goToConcreteForm: function() {
//			var infoFormId = 1;
//			this.goToConcreteForm(1);
//		},
//}

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
	var questFormId = 0;
	goToConcreteForm(questFormId);
}

function goToInfoFormTab() {
	var infoFormId = 0;
	goToConcreteForm(0);
}

function goToChooseComponentTab() {
    $('#tabs').tabs('enable', 0).tabs('select', 0);
}

function goToConcreteForm(formID) {
    goToFormTab();
    $("#accordion").accordion("activate", formID);
}
