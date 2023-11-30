function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

document.addEventListener('DOMContentLoaded', function () {
  let intervalId;

  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  startButton.addEventListener('click', function () {
    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopButton.addEventListener('click', function () {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(intervalId);
  });
});
