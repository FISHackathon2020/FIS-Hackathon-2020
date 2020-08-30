$(document).ready(function() {

  var animating = false;
  var positionsCounter = 0;
  var numOfpositions = 6;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $position;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $position.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");
  };

  function release() {
    if (pullDeltaX >= decisionVal) {
      $position.css("transform", "translateX(-30)")
    } else if (pullDeltaX <= -decisionVal) {
      $position.css("transform", "translateX(30)");
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {

      setTimeout(function() {
        $position.addClass("below").removeClass("inactive to-left to-right");
        positionsCounter++;
        if (positionsCounter === numOfpositions) {
          stop
          $(".match__position").removeClass("below");
        }
      }, );
    }

    setTimeout(function() {
      $position.attr("style", "")
      pullDeltaX = 0;
      animating = false;
    },);
  };

  $(document).on("mousedown touchstart", ".match__position:not(.inactive)", function(e) {
    if (animating) return;

    $position = $(this);
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