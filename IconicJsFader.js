$(function(){
    var items = $(".fader-stage-item");
    var position = -1;
    var interval = 5000;
    var lockMovement = false;



    goToNext = function(force) {
        if( ! lockMovement || force ) {
            position++;
            if (position >= items.length) {
                position = 0;
            }
            show();
            controlBarMove();
        }
    };

    goToPrevious = function(force) {
        if( ! lockMovement || force ) {
            position--;
            if (position < 0) {
                position = items.length - 1;
            }
            show();
            controlBarMove();
        }
    };

    goToPosition = function(index) {
        position = index;
        show();
        controlBarMove();
    };

    show = function() {
        items.removeClass("active");
        $(items.get(position)).addClass("active");
    };

    var timer;

    loop = function () {
        timer = setInterval(goToNext, interval);
    };

    controlBarMove = function() {
        $(".fader-navigation-control-bar").css("left", 133-(99*position));
    };

    //Events

    $(".fader, .fader-navigation").on("mouseover", function(){
        lockMovement = true;
        $(".fader-control-left").addClass("active");
        $(".fader-control-right").removeClass("active");
    });

    $(".fader").on("mouseout", function() {
        lockMovement = false;
        $(".fader-control-left").css("opacity", 0);
        $(".fader-control-right").css("opacity", 0);
    });

    $(".fader-navigation-control-left").on("click", function(){
        goToPrevious(true);
    });

    $(".fader-navigation-control-right").on("click", function(){
        goToNext(true);
    });

    $(".fader-navigation-item").on("click", function () {
        goToPosition($(this).data("index"));
    });

    $(".fader-control-left").on("click", function(){
        goToPrevious(true);
    });

    $(".fader-control-right").on("click", function(){
        goToNext(true);
    });

    $(".fader-stage-item").on("click", function() {
        var bg = $(this).css('background-image');
        bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
        var image = $("<img>").prop("src", bg).addClass("img img-responsive");
        $(".fader-preview-content").empty();
        image.appendTo($(".fader-preview-content"));
        $("#fader-preview").modal("show");
    });

    loop();
});