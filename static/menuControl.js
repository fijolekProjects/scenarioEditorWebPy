
$(function () {
    $("#accordion").accordion({
        icons: false,
        heightStyle: "content",
        collapsible: true,
    });
    $("#tabs").tabs();

});
$(function () {
    $("#tabs").tabs({
        fx: {
            height: 'toggle',
            opacity: 'toggle'
        }
    });
});