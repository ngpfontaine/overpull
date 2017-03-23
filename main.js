var pull = document.getElementById('overpull');
var msg = document.getElementById('msg');
var height = pull.clientHeight;
var cursorClickOffset = 0;
wHeight = window.outerHeight;

var maxH = 120;
pull.style.maxHeight = maxH + 'px';

var pullToggle = true;

var touchEvDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var touchEvUp = 'ontouchend' in window ? 'touchend' : 'mouseup';
var touchEvMove = 'ontouchmove' in window ? 'touchmove' : 'mousemove';

var mobile = 'ontouchstart' in window ? true : false;

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {       
    document.addEventListener(touchEvDown, function foo(e) {
      pullTouchOn(e);
      cursorClickOffset = mobile ? wHeight-(e.targetTouches[0].pageY) : wHeight-(e.clientY);
    });
    document.addEventListener(touchEvUp, pullTouchOff);
  }
};
  
function pullTouchOn(e) {
  pullToggle = true;
  document.addEventListener(touchEvMove,function foo(e) {
    pullHeight(e,pullToggle);
  });
  pull.style.transition = 'none';
}

function pullTouchOff() {
  pullToggle = false;
  document.removeEventListener(touchEvMove, function(e) {
    pullHeight(e,pullToggle);
  });
  pull.style.transition = 'height 0.25s ease-in';
  pull.style.height = height + 'px';
  pull.style.maxHeight = maxH + 'px';
}

function pullHeight(inp,trueFalse) {
  if (trueFalse) {
    var pullHeightZeroed = mobile ? (window.outerHeight-inp.targetTouches[0].pageY)-cursorClickOffset : (window.outerHeight-inp.clientY)-cursorClickOffset;
    overpull.style.height = (pullHeightZeroed/2) + 'px';
    if ((pullHeightZeroed*2/3) > (maxH-20)) {
      // pull.style.maxHeight = (maxH+10) + 'px';
      pull.style.minHeight = '40px';
      msg.classList.add('show');
    }
  }
}
