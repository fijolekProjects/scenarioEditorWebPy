$(document).ready(function() {
            $(".button").click(function() {
                    $.ajax({
                            type: "POST",
                            data: $("form").serialize() + '&foo=' + $('#image').val(),
                            success: function(data) {
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
