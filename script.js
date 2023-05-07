const dialContainer = document.getElementById("dial-container");
const dial = document.getElementById("dial");
const dialMiddle = document.getElementById("dial-middle");
const dialBackground = document.getElementById("dial-background");

let isDragging = false;

function addEventListenersToDial(dialElement) {
  dialElement.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
  });

  dialElement.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const angle = calculateAngle(e, dialElement);
      dialElement.style.transform = `rotate(${angle}deg)`;
    }
  });

  dialElement.addEventListener("mouseup", () => {
    isDragging = false;
    dialElement.style.transition = "transform 0.5s";
    dialElement.style.transform = `rotate(0deg)`;

    setTimeout(() => {
      dialElement.style.transition = "none";
    }, 500);
  });
}

addEventListenersToDial(dial);
addEventListenersToDial(dialMiddle);
addEventListenersToDial(dialBackground);

dial.addEventListener("dblclick", () => {
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

dialContainer.addEventListener("click", () => {
  dialMiddle.style.display = "none";
  dialBackground.style.display = "none";
});

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
