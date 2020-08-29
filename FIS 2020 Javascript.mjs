$(document).ready(function() {

  var animating = false;
  var positionsCounter = 0;
  var numOfpositions = 6;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $position, $positionReject, $positionLike;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $position.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;
    $positionReject.css("opacity", rejectOpacity);
    $positionLike.css("opacity", likeOpacity);
  };

  function release() {

    if (pullDeltaX >= decisionVal) {
      $position.addClass("to-right");
    } else if (pullDeltaX <= -decisionVal) {
      $position.addClass("to-left");
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $position.addClass("inactive");

      setTimeout(function() {
        $position.addClass("below").removeClass("inactive to-left to-right");
        positionsCounter++;
        if (positionsCounter === numOfpositions) {
          positionsCounter = 0;
          $(".match__position").removeClass("below");
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $position.addClass("reset");
    }

    setTimeout(function() {
      $position.attr("style", "").removeClass("reset")
        .find(".match__position__choice").attr("style", "");

      pullDeltaX = 0;
      animating = false;
    }, 300);
  };

  $(document).on("mousedown touchstart", ".match__position:not(.inactive)", function(e) {
    if (animating) return;

    $position = $(this);
    $positionReject = $(".match__position__choice.m--reject", $position);
    $positionLike = $(".match__position__choice.m--like", $position);
    var startX =  e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = (x - startX);
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    });
  });

});
