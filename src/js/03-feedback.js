import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const feedbackForm = document.querySelector('.feedback-form');
  const emailInput = feedbackForm.querySelector('input[name="email"]');
  const messageInput = feedbackForm.querySelector('textarea[name="message"]');

  const saveToLocalStorage = () => {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  };

  const loadFromLocalStorage = () => {
    const formDataString = localStorage.getItem('feedback-form-state');
    if (formDataString) {
      const formData = JSON.parse(formDataString);
      emailInput.value = formData.email || '';
      messageInput.value = formData.message || '';
    }
  };

  const throttledSaveToLocalStorage = throttle(saveToLocalStorage, 500);

  feedbackForm.addEventListener('input', function () {
    throttledSaveToLocalStorage();
  });

  loadFromLocalStorage();

  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };

    console.log('Submitted Data:', formData);

    localStorage.removeItem('feedback-form-state');

    feedbackForm.reset();
  });
});
