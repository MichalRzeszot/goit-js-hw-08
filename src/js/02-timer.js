import flatpickr from 'flatpickr/dist/flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.addEventListener('DOMContentLoaded', function () {
  const datetimePicker = document.getElementById('datetime-picker');
  const startButton = document.querySelector('[data-start]');
  const timerDays = document.querySelector('[data-days]');
  const timerHours = document.querySelector('[data-hours]');
  const timerMinutes = document.querySelector('[data-minutes]');
  const timerSeconds = document.querySelector('[data-seconds]');

  let countdownInterval;
  let timeDifference;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate > new Date()) {
        startButton.disabled = false;
        timeDifference = selectedDate.getTime() - new Date().getTime();
      } else {
        Notiflix.Notify.warning('Please choose a date in the future');
        startButton.disabled = true;
      }
    },
  };

  flatpickr(datetimePicker, options);

  startButton.addEventListener('click', function () {
    startButton.disabled = true;

    countdownInterval = setInterval(() => {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      timerDays.textContent = addLeadingZero(days);
      timerHours.textContent = addLeadingZero(hours);
      timerMinutes.textContent = addLeadingZero(minutes);
      timerSeconds.textContent = addLeadingZero(seconds);

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        startButton.disabled = false;
        Notiflix.Notify.success('Countdown completed!');
      }

      timeDifference -= 1000;
    }, 1000);
  });
});
