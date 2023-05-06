const dial = document.getElementById("dial");

dial.onmousedown = function (event) {
    event.preventDefault();

    let angle = 0;
    const centerX = dial.getBoundingClientRect().left + dial.offsetWidth / 2;
    const centerY = dial.getBoundingClientRect().top + dial.offsetHeight / 2;

    function onMouseMove(event) {
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        if (newAngle >= 0 && newAngle <= 360) {
            angle = newAngle;
            dial.style.transform = `rotate(${angle}deg)`;
        }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
    };
};

dial.ondragstart = function () {
    return false;
};
