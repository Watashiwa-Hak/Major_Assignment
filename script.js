document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("glowing-header");
  let lastX, lastY;
  let timer, interval;

  function createSparkle(x, y, isBombEffect = false) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    header.appendChild(sparkle);

    const size = Math.random() * 18 + 5; // Random size between 7 and 22
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    if (isBombEffect) {
      const angle = Math.random() * 360;
      const distance = Math.random() * 100 + 25; // Random distance between 25 and 125
      const translateX = distance * Math.cos((angle * Math.PI) / 180);
      const translateY = distance * Math.sin((angle * Math.PI) / 180);
      sparkle.style.setProperty("--translateX", `${translateX}px`);
      sparkle.style.setProperty("--translateY", `${translateY}px`);
      sparkle.style.animation = "moveBombStar 1s forwards";
    } else {
      sparkle.style.animation = "fadeAndRotate 1s forwards";
    }

    setTimeout(() => sparkle.remove(), 1000); // Remove sparkle after 1 second
  }

  function triggerBombEffect() {
    for (let i = 0; i < 10; i++) {
      createSparkle(lastX, lastY, true); // true indicates bomb effect
    }
  }

  header.addEventListener("mousemove", function (e) {
    lastX = e.pageX - header.offsetLeft;
    lastY = e.pageY - header.offsetTop;

    clearTimeout(timer);
    clearInterval(interval); // Clear the interval when the mouse moves

    createSparkle(lastX, lastY);

    timer = setTimeout(() => {
      interval = setInterval(triggerBombEffect, 500); // Repeat the bomb effect every 500ms
    }, 1000);
  });
  header.addEventListener("click", function (e) {
    const clickX = e.pageX - header.offsetLeft;
    const clickY = e.pageY - header.offsetTop;
    triggerBombEffect(clickX, clickY); // Trigger bomb effect on click
  });
});
