var pull = document.getElementById('overpull');
var msg = document.getElementById('msg');
var height = pull.clientHeight;
var cursorClickOffset = 0;
wHeight = window.outerHeight;
var maxH = 120;
pull.style.maxHeight = maxH + 'px';

var info = document.getElementById('info');
info.innerHTML = wHeight;

var pullToggle = true;

var touchEvDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var touchEvUp = 'ontouchend' in window ? 'touchend' : 'mouseup';
var touchEvMove = 'ontouchmove' in window ? 'touchmove' : 'mousemove';

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {       
    document.addEventListener(touchEvDown, function foo(e) {
      pullTouchOn(e);
      cursorClickOffset = wHeight-(e.targetTouches[0].pageY);
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
  info.innerHTML = 'pullTouchOff()';
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
    var pullHeightZeroed = (window.outerHeight-inp.targetTouches[0].pageY)-cursorClickOffset;
    overpull.style.height = pullHeightZeroed + 'px';
    if (pullHeightZeroed > (maxH-20)) {
      // pull.style.maxHeight = (maxH+10) + 'px';
      pull.style.minHeight = '40px';
      msg.classList.add('show');
    }
  }
}
