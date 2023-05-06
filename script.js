const dial = document.querySelector('.dial');

let isDragging = false;
let initialAngle = 0;
let currentRotation = 0;

dial.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialAngle = calculateAngle(e.clientX, e.clientY);
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const angle = calculateAngle(e.clientX, e.clientY);
    const delta = angle - initialAngle;
    currentRotation += delta;

    dial.style.transform = `rotate(${currentRotation}deg)`;
    initialAngle = angle;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function calculateAngle(x, y) {
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
}
