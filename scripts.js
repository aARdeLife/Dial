const dialContainer = document.getElementById("dial-container");
const dial = document.getElementById("dial");
const dialMiddle = document.getElementById("dial-middle");
const dialBackground = document.getElementById("dial-background");

dialMiddle.style.display = "none";
dialBackground.style.display = "none";

let isDragging = false;

function rotateDial(e, dialElement) {
  const angle = calculateAngle(e, dialElement);
  dialElement.style.transform = `rotate(${angle}deg)`;
}

function calculateAngle(event, dial) {
  const rect = dial.getBoundingClientRect();
  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
  const angle = Math.atan2(event.clientY - center.y, event.clientX - center.x);
  const degree = angle * (180 / Math.PI) + 90;
  return degree;
}

dialContainer.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isDragging = true;
});

dialContainer.addEventListener("mousemove", (e) => {
  if (isDragging) {
    rotateDial(e, dial);
    if (dialMiddle.style.display !== "none") {
      rotateDial(e, dialMiddle);
    }
    if (dialBackground.style.display !== "none") {
      rotateDial(e, dialBackground);
    }
  }
});

dialContainer.addEventListener("mouseup", () => {
  isDragging = false;
  dial.style.transition = "transform 0.5s";
  dialMiddle.style.transition = "transform 0.5s";
  dialBackground.style.transition = "transform 0.5s";

  dial.style.transform = `rotate(0deg)`;
  dialMiddle.style.transform = `rotate(0deg)`;
  dialBackground.style.transform = `rotate(0deg)`;

  setTimeout(() => {
    dial.style.transition = "none";
    dialMiddle.style.transition = "none";
    dialBackground.style.transition = "none";
  }, 500);
});

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

