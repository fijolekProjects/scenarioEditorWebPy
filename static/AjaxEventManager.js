$(document).ready(function () {
	var AjaxEventManager = {
        handleClickAllComponentsButtons: function () {
            var componentNameArray = ["#quest", "#info"];
            var handleClickOneComponentButton = function (component) {
                $(component.concat("_button")).click(function () {
                    var serializedForm = $(component.concat("_form")).serialize();
                    var currentId = $(component.concat("_id")).val();
                    componentArray[currentId]["queryString"] = serializedForm;
                    queryStringsArr.splice(currentId, 1, serializedForm);
                    MenuManager.cleanForms();
                    MenuManager.goToChooseComponentTab();
                    $("#remove_answer_button").click();
                    $.ajax({
                        async: false,
                    });
                    return false;
                });
            }

            $.each(componentNameArray, function (index, value) {
                handleClickOneComponentButton(value);
            });
        }(),

        handleClickGenerateScenarioButton: function () {
            $(".scenario_button").click(function () {
                var wholeQueryString = "";
                for (var i = 0; i < queryStringsArr.length; i++) {
                    wholeQueryString += queryStringsArr[i] + "&EOS=" + i + "&";
                }
                alert(wholeQueryString);
                $.ajax({
                    type: "POST",
                    async: false,
                    data: wholeQueryString,
                    success: function (data) {
                        window.open('data:text/xml,' + data);
                        $('#result').html("SUCCESS!").hide().fadeIn(1500);
                    },
                });
                return false;
            });
        }(),
    }
});