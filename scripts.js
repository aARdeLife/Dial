const dial = document.getElementById("dial");
const dialMiddle = document.getElementById("dial-middle");
const dialBackground = document.getElementById("dial-background");

function getAngle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle < 0) angle += 360;
  return angle;
}

function rotateDial(dial, angle) {
  dial.style.transform = `rotate(${angle}deg)`;
}

function onDialMouseDown(event) {
  event.preventDefault();
  event.stopPropagation();

  const dial = event.currentTarget;
  const dialRect = dial.getBoundingClientRect();
  const dialCenterX = dialRect.x + dialRect.width / 2;
  const dialCenterY = dialRect.y + dialRect.height / 2;

  function onMouseMove(event) {
    const angle = getAngle(dialCenterX, dialCenterY, event.clientX, event.clientY);
    rotateDial(dial, angle);
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    dial.style.transition = "transform 0.5s";
    setTimeout(() => {
      rotateDial(dial, 0);
      dial.style.transition = "";
    }, 0);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

dial.addEventListener("mousedown", onDialMouseDown);
dialMiddle.addEventListener("mousedown", onDialMouseDown);
dialBackground.addEventListener("mousedown", onDialMouseDown);

// Show orange dial when red dial is double-clicked
dial.addEventListener("dblclick", (e) => {
  e.stopPropagation();
  dialMiddle.style.display = "block";
});

// Show yellow dial when orange dial is double-clicked
dialMiddle.addEventListener("dblclick", (e) => {
  e.stopPropagation();
  dialBackground.style.display = "block";
});

// Hide orange and yellow dials when clicking outside
document.addEventListener("click", () => {
  dialMiddle.style.display = "none";
  dialBackground.style.display = "none";
});
