const dialContainer = document.getElementById("dial-container");
const dial = document.getElementById("dial");
const dialMiddle = document.getElementById("dial-middle");
const dialBackground = document.getElementById("dial-background");

let dialRotation = 0;
let isDragging = false;
let doubleClickTimer;

dial.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
});

dial.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const angle = calculateAngle(e, dial);
    dialRotation = angle;
    dial.style.transform = `rotate(${angle}deg)`;
  }
});

dial.addEventListener("mouseup", () => {
  isDragging = false;
  dial.style.transition = "transform 0.5s";
  dialRotation = 0;
  dial.style.transform = `rotate(${dialRotation}deg)`;

  setTimeout(() => {
    dial.style.transition = "none";
  }, 500);
});

dial.addEventListener("dblclick", () => {
  clearTimeout(doubleClickTimer);
  if (dialMiddle.style.display === "none") {
    dialMiddle.style.display = "block";
  } else {
    dialMiddle.style.display = "none";
  }
});

dialMiddle.addEventListener("dblclick", (e) => {
  e.stopPropagation();
  if (dialBackground.style.display === "none") {
    dialBackground.style.display = "block";
  } else {
    dialBackground.style.display = "none";
  }
});

dialContainer.addEventListener
