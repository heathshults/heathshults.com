$("label").dblclick(function () {
    var lblID = $(this).attr('id');
    //alert(lblID);
    $("#" + lblID).attr('contenteditable', 'true');
    $("#" + lblID).keypress(function (e) {
        var keycode = e.which;
        //console.log(keycode);
        if (keycode == 13) {
            $("#" + lblID).attr('contentEditable', 'false');
        }
    });
});
