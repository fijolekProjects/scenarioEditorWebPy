$(document).ready(function () {
    $("#task_location_parent").css("display", "none");
    $(".is_task_location").click(function () {
        if ($('input[name=task_location]:checked').val() == "Yes") {
            $("#task_location_parent").slideDown("fast"); //Slide Down Effect
        } else {
            $("#task_location_parent").slideUp("fast"); //Slide Up Effect
        }
    });
    $("#task_text_parent").css("display", "none");
    $(".is_task_text").click(function () {
        if ($('input[name=task_text]:checked').val() == "Yes") {
            $("#task_text_parent").slideDown("fast"); //Slide Down Effect
        } else {
            $("#task_text_parent").slideUp("fast"); //Slide Up Effect
        }
    });
    $("#task_choice_parent").css("display", "none");
    $(".is_task_choice").click(function () {
        if ($('input[name=task_choice]:checked').val() == "Yes") {
            $("#task_choice_parent").slideDown("fast"); //Slide Down Effect
        } else {
            $("#task_choice_parent").slideUp("fast"); //Slide Up Effect
        }
    });
    $("#task_hint_parent").css("display", "none");
    $(".is_task_hint").click(function () {
        if ($('input[name=task_hint]:checked').val() == "Yes") {
            $("#task_hint_parent").slideDown("fast"); //Slide Down Effect
        } else {
            $("#task_hint_parent").slideUp("fast"); //Slide Up Effect
        }
    });


});