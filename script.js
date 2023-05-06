const dial = document.getElementById("dial");
const dialMiddle = document.getElementById("dial-middle");
const dialContainer = document.getElementById("dial-container");

let isRotating = false;
let lastMouseAngle = null;

function getAngleFromMouseEvent(event) {
  const rect = dial.getBoundingClientRect();
  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };

  const angle =
    (Math.atan2(event.clientY - center.y, event.clientX - center.x) * 180) /
    Math.PI;

  return angle;
}

dial.addEventListener("mousedown", (event) => {
  isRotating = true;
  lastMouseAngle = getAngleFromMouseEvent(event);
});

document.addEventListener("mousemove", (event) => {
  if (isRotating) {
    const currentMouseAngle = getAngleFromMouseEvent(event);
    const delta = currentMouseAngle - lastMouseAngle;

    const currentRotation = parseFloat(dial.style.transform.match(/rotate\((.+)deg\)/)[1]);
    const newRotation = currentRotation + delta;

    dial.style.transform = `rotate(${newRotation}deg)`;
    dialMiddle.style.transform = `rotate(${newRotation}deg)`;
    dialContainer.style.transform = `rotate(${newRotation}deg)`;

    lastMouseAngle = currentMouseAngle;
  }
});

document.addEventListener("mouseup", () => {
  isRotating = false;
});

let doubleClickTimeout = null;

dial.addEventListener("click", () => {
  if (doubleClickTimeout) {
    clearTimeout(doubleClickTimeout);
    doubleClickTimeout = null;

    if (dialMiddle.style.display === "none") {
      dialMiddle.style.display = "block";
    } else if (dialContainer.style.display === "none") {
      dialContainer.style.display = "block";
    } else {
      dialContainer.style.display = "none";
      dialMiddle.style.display = "none";
    }
  } else {
    doubleClickTimeout = setTimeout(() => {
      clearTimeout(doubleClickTimeout);
      doubleClickTimeout = null;
    }, 250);
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dial")) {
    dialContainer.style.display = "none";
    dialMiddle.style.display = "none";
  }
});

