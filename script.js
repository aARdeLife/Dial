const dialContainer = document.getElementById('dial-container');
const dial = document.getElementById('dial');
const dialMiddle = document.getElementById('dial-middle');

dialMiddle.style.display = 'none'; // Hide the orange dial by default

let isRotating = false;
let initialAngle = 0;
let currentAngle = 0;

function rotateDial(event) {
    if (!isRotating) return;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI;
    const delta = initialAngle - angle;
    dial.style.transform = `rotate(${-delta + currentAngle}deg)`;
}

dial.addEventListener('mousedown', event => {
    isRotating = true;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    initialAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI;
});

document.addEventListener('mousemove', rotateDial);

document.addEventListener('mouseup', () => {
    if (!isRotating) return;
    isRotating = false;
    currentAngle = (360 + currentAngle - initialAngle) % 360;
});

dial.addEventListener('dblclick', () => {
    dialMiddle.style.display = dialMiddle.style.display === 'none' ? 'block' : 'none';
});

dialMiddle.addEventListener('dblclick', () => {
    const dialBackground = document.querySelector('.dial-background');
    dialBackground.style.display = dialBackground.style.display === 'none' ? 'block' : 'none';
});

dialContainer.addEventListener('click', event => {
    if (event.target !== dialContainer) return;
    dialMiddle.style.display = 'none';
    const dialBackground = document.querySelector('.dial-background');
    dialBackground.style.display = 'none';
});
