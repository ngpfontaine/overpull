var pull = document.getElementById('overpull');
var msg = document.getElementById('overpull-msg');
var height = pull.clientHeight;
var cursorClickOffset = 0;
wHeight = window.outerHeight;

var maxH = 120;
// pull.style.maxHeight = maxH + 'px';

// TOGGLE DISABLE FOR TOUCHEND
var pullToggle = true;
var pullSuccess = false;

var touchEvDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var touchEvUp = 'ontouchend' in window ? 'touchend' : 'mouseup';
var touchEvMove = 'ontouchmove' in window ? 'touchmove' : 'mousemove';
// FLAG TO SWAP INPUT'S Y POS
var mobile = 'ontouchstart' in window ? true : false;

// if (mobile) {
window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {       
    document.addEventListener(touchEvDown, function foo(e) {
      pullTouchOn(e);
      cursorClickOffset = mobile ? wHeight-(e.targetTouches[0].pageY) : wHeight-(e.clientY);
    });
    document.addEventListener(touchEvUp, pullTouchOff);
  }
};
// }
  
function pullTouchOn(e) {
  pullToggle = true;
  pull.style.transition = 'none';
  document.addEventListener(touchEvMove,function foo(e) {
    pullHeight(e,pullToggle);
  });
}

function pullTouchOff() {
  pullToggle = false;
  document.removeEventListener(touchEvMove, function(e) {
    pullHeight(e,pullToggle);
  });
  // pull.style.transition = 'height 0.25s ease-in';
  // pull.style.height = height + 'px';
  pull.style.transition = 'transform 0.25s ease-in';
  pull.style.transform = 'translateY(0)';
  if (pullSuccess) {
    pull.style.transform = 'translateY(-40px)';
  }
}

function pullHeight(inp,trueFalse) {
  if (trueFalse) {
    var pullHeightZeroed = mobile ? (window.outerHeight-inp.targetTouches[0].pageY)-cursorClickOffset : (window.outerHeight-inp.clientY)-cursorClickOffset;
    overpull.style.transform = 'translateY(-' + (pullHeightZeroed/2) + 'px)';
    // overpull.style.height = (pullHeightZeroed/2) + 'px';
    if ((pullHeightZeroed*2/3) > (maxH-20)) {
      pull.style.minHeight = '40px';
      msg.classList.add('show');
      pullSuccess = true;
    }
  }
}
