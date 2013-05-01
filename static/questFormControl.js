$(document).ready(function () {
	hideFormFields();
    $(':radio').on('click',function(){
        var elem = $("ol.formset", $(this).parent());
        if($(this).val() === "Yes" )
            elem.slideDown('fast');
        else
            elem.slideUp('fast');
    });
});

