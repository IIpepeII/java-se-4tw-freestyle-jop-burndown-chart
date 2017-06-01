$(document).ready(function () {

    $('.table-buttons').bind("contextmenu",function(e) {
        if(!($(this).hasClass("revealed"))){
        if ($(this).hasClass("glyphicon")) {
            $(this).removeClass("glyphicon");
            $(this).removeClass("glyphicon-eye-open")
        } else {
        $(this).addClass("glyphicon glyphicon-eye-open");
    }
        }
        return false;
    });

    $(".table-buttons").click(function () {
        var idParsed = $(this['id'].split('_'));
        var x = idParsed[0];
        var y = idParsed[1];
        $.ajax({
            url: "/retrieve_data",
            type: "POST",
            async: true,
            data: {x: x, y: y},
            success: function (resp) {
                for (var i = 0; i < resp["currentChars"].length; i++) {
                    var selector = '#' + resp["coords"][i][0] + "_" + resp["coords"][i][1];
                    if(resp["currentChars"][i] == '9') {
                        $(".table-buttons").prop('disabled', true);
                        $(selector).parent().html("<p class='mine-cell glyphicon glyphicon-certificate'></p>");
                        $("#game-over-and-new-game").removeAttr("style");
                        $("#game-over-10-and-new-game").removeAttr("style");
                        $("#game-over-15-and-new-game").removeAttr("style");
                    }else {
                        $(selector).html(resp["currentChars"][i]);
                        $(selector).addClass("revealed button-value" + resp["currentChars"][i])
                        $(selector).parent().removeClass("unchecked");
                        $(selector).removeClass("glyphicon-eye-open");
                        $(selector).removeClass("glyphicon");
                    }
                   evaluator();
                }
            }
        });
    });

    function evaluator() {
        $.ajax({
            url: "/evaluate",
            type: "GET",
            async: true,
            success: function (resp) {
                if($(".button-container").length - $(".revealed").length == resp["numberOfMines"]){
                    $(".table-buttons").prop('disabled', true);
                    $(".unchecked").html("<p class='mine-cell glyphicon glyphicon-certificate'></p>");
                    $("#congratulation-and-new-game").removeAttr("style");
                    $("#congratulation-10-and-new-game").removeAttr("style");
                    $("#congratulation-15-and-new-game").removeAttr("style");
                }
            },
            error: function () {
                alert("something went wrong")
            }
        });
    }

});