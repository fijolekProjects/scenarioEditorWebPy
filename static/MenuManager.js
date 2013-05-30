var MenuManager = {
    goToFormTab: function () {
        var formTabId = 1;
        $('#tabs').tabs('enable', formTabId).tabs('select', formTabId);
    },
    
    goToConcreteForm: function (formID) {
        this.goToFormTab();
        $("#accordion").accordion("activate", formID);
    },

    goToQuestFormTab: function () {
        var questFormId = 0;
        this.goToConcreteForm(questFormId);
    },
    
    goToInfoFormTab: function () {
        var infoFormId = 1;
        this.goToConcreteForm(infoFormId);
    },

    hideFormFields: function () {
        $("#quest_task_location_parent, #quest_task_text_parent, #quest_task_choice_parent, #quest_task_hints_parent").css("display", "none");
    },

    cleanForms: function () {
        this.hideFormFields();
        $("#quest_form").get(0).reset();
        $("#info_form").get(0).reset();
    },

    goToChooseComponentTab: function () {
        var chooseComponentTabId = 0;
        $('#tabs').tabs('enable', chooseComponentTabId).tabs('select', chooseComponentTabId);
    },

    accordioHandler: function () {
        $(function () {
            $("#accordion").accordion({
                icons: false,
                heightStyle: "content",
                collapsible: true,
            });
            $("#tabs").tabs();
        });
    }(),

    tabsHandler: function () {
        $(function () {
            $("#tabs").tabs({
                fx: {
                    height: 'toggle',
                    opacity: 'toggle'
                }
            });
        });
    }(),

    onClickSlider: function () {
        $(document).ready(function () {
            MenuManager.hideFormFields();
            $(':radio').on('click', function () {
                var elem = $("ol.formset", $(this).parent());
                if ($(this).val() === "Yes") {
                    elem.slideDown('fast');
                } else {
                    elem.slideUp('fast');
                }
            });
        });
    }(),

    addQuestionFieldsToForm: function () {
        $(document).ready(function () {
            var choiceQuestion = '<ul><li><label for="choice_answer">answer/success code</label><input type="text" id="quest_task_choice_answer" name="choice_answer_param" /><input type="number" id="quest_task_choice_success_code" name="successCode"/></li></ul>';

            $("#add_answer_button").click(function () {
                $("#quest_task_choice_parent").append(choiceQuestion);
            });
            $("#remove_answer_button").click(function () {
                $("#quest_task_choice_parent").children("ul").remove();
            });
        });
    }(),
}