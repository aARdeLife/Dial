const dial = document.getElementById("dial");
const dialMiddle = document.getElementById("dial-middle");
const dialBackground = document.getElementById("dial-background");
const dialContainer = document.getElementById("dial-container");

let dialRotation = 0;
let dialMiddleRotation = 0;
let dialBackgroundRotation = 0;

dial.addEventListener("mousedown", rotateDial);
dialMiddle.addEventListener("mousedown", rotateDial);
dialBackground.addEventListener("mousedown", rotateDial);

dial.addEventListener("dblclick", (e) => {
  e.stopPropagation();
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

document.addEventListener("click", () => {
  dialMiddle.style.display = "none";
  dialBackground.style.display = "none";
});

function rotateDial(e) {
  e.stopPropagation();
  const dialId = e.target.id;
  const dialElement = document.getElementById(dialId);
  let dialRotation = 0;

  function onMouseMove(event) {
    const { offsetX, offsetY } = event;
    const atan = Math.atan2(offsetY - dialElement.offsetHeight / 2, offsetX - dialElement.offsetWidth / 2);
    const deg = -atan * (180 / Math.PI) + 180;
    dialRotation = deg;
    dialElement.style.transform = `translate(-50%, -50%) rotate(${dialRotation}deg)`;
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

