var pull = document.getElementById('overpull');
var msg = document.getElementById('msg');
var height = pull.clientHeight;
var cursorClickOffset = 0;
wHeight = window.innerHeight;
var maxH = 200;
pull.style.maxHeight = maxH + 'px';

var pullToggle = true;

var touchEvDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
var touchEvUp = 'ontouchend' in window ? 'touchend' : 'mouseup';
var touchEvMove = 'ontouchmove' in window ? 'touchmove' : 'mousemove';

window.onscroll = function(ev) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {       
		document.addEventListener(touchEvDown, function foo(e) {
			pullTouchOn(e);
		});
		document.addEventListener(touchEvUp, pullTouchOff);
	}
};
  
function pullTouchOn(e) {
	cursorClickOffset = wHeight-e.clientY;
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
  	var pullHeightZeroed = window.innerHeight-inp.clientY-cursorClickOffset;
  	overpull.style.height = pullHeightZeroed + 'px';
    if (pullHeightZeroed > (maxH-20)) {
    	// pull.style.maxHeight = (maxH+10) + 'px';
      pull.style.minHeight = '40px';
      msg.classList.add('show');
    }
  }
}
