$(document).ready(function() {

  var animating = false;
  var positionsCounter = 0;
  var numOfpositions = 6;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $position;
  var hasBeenSeen = false;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $position.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");
  };
  
  
  function release() {
    if (pullDeltaX >= decisionVal) {
      $position.css("transform", "translateX(30rem)");
    } else if (pullDeltaX <= -decisionVal) {
      $position.css("transition", "transform 0.3s", "transform", "translateX(-30rem)", "!important");
    }
    if (Math.abs(pullDeltaX) >= decisionVal) {
      $position.css("transition", "transform 0.3s");

      setTimeout(function() {

        positionsCounter++;
        if (positionsCounter === numOfpositions) {
          positionsCounter = 8;
          $(".position").css("z-index", "-1");
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $position.css("transition", "transform 0.3s", "transform", "translateX(0)", "!important");
    }

    setTimeout(function() {
      $position.attr("style", "")
        .find(".choice").attr("style", "");

      pullDeltaX = 0;
      animating = false;
    }, 300);
  };

  $(document).on("mousedown touchstart", ".position:not(.inactive)", function(e) {
    if (animating) return;

    $position = $(this);
    $positionReject = $(".choice", $position);
    $positionLike = $(".choice", $position);
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