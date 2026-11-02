const DURATION = 1000;

window.addEventListener("DOMContentLoaded", () => {
  const counters = [...document.querySelectorAll(".counter")];
  const maxValues = counters.map((counter) => Number(counter.dataset.max));
  let start;

  function step(timestamp) {
    start ??= timestamp;
    const progress = Math.min((timestamp - start) / DURATION, 1);

    counters.forEach((counter, index) => {
      counter.textContent = Math.round(maxValues[index] * progress);
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
});
