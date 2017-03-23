var pull = document.getElementById('overpull');
var msg = document.getElementById('overpull-msg');
var height = pull.clientHeight;
var cursorClickOffset = 0;
var wHeight = window.outerHeight;

var maxH = 120;

// TOGGLE DISABLE FOR TOUCHEND
var pullToggle = true;
// HEIGHT SUCCES FLAG FOR TOUCHEND
var pullSuccess = false;

var touchEvDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var touchEvUp = 'ontouchend' in window ? 'touchend' : 'mouseup';
var touchEvMove = 'ontouchmove' in window ? 'touchmove' : 'mousemove';
// FLAG TO SWAP INPUT'S Y POS
var mobile = 'ontouchstart' in window ? true : false;

// if (mobile) {
window.onscroll = function(ev) {
  // SCROLLED TO BOTTOM, ENABLE
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    document.addEventListener(touchEvDown, pullOnHandler);
    document.addEventListener(touchEvUp, pullOffHandler);
  }
  // DISABLE/REMOVE EVENTS
  else {
    pullToggle = false;
    document.removeEventListener(touchEvDown, pullOnHandler);
    document.removeEventListener(touchEvUp, pullOffHandler);
  }
};
// }

// TAKE INPUT, CALCULATE OFFSET & ADD pullHeight EventListener
var pullOnHandler = function(e) {
  pullToggle = true;
  pull.style.transition = 'none';
  document.addEventListener(touchEvMove,function foo(e) {
    pullHeight(e,pullToggle);
  });
  cursorClickOffset = mobile ? wHeight-(e.targetTouches[0].pageY) : wHeight-(e.clientY);
};

// INPUT RELEASE
var pullOffHandler = function(e) {
  pullToggle = false;
  document.removeEventListener(touchEvMove, function(e) {
    pullHeight(e,pullToggle);
  });
  
  pull.style.transition = 'transform 0.25s ease-in';
  pull.style.transform = 'translateY(0)';
  
  if (pullSuccess) {
    pull.style.transform = 'translateY(-40px)';
  }
};

function pullHeight(inp,trueFalse) {
  if (trueFalse) {
    // CALC FROM DOC HEIGHT, INITIAL CLICK POS, & CLICK MOVE
    var pullHeightZeroed = mobile ? (window.outerHeight-inp.targetTouches[0].pageY)-cursorClickOffset
      :
      (window.outerHeight-inp.clientY)-cursorClickOffset;
    // LIMIT DRAG DISTANCE, & TRANSLATE BY HALF
    if (pullHeightZeroed/2 < maxH) {
      overpull.style.transform = 'translateY(-' + (pullHeightZeroed/2) + 'px)';
    }
    // TRIGGER W/ A LITTLE EXTRA ROOM TO SPARE
    if ((pullHeightZeroed*2/3) > maxH) {
      pull.style.minHeight = '40px';
      msg.classList.add('show');
      pullSuccess = true;
    }
  }
}
