import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const feedbackForm = document.querySelector('.feedback-form');
  const emailInput = feedbackForm.querySelector('input[name="email"]');
  const messageInput = feedbackForm.querySelector('textarea[name="message"]');
  const submitButton = feedbackForm.querySelector('button[type="submit"]');

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
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    }
  };

  const throttledSaveToLocalStorage = throttle(saveToLocalStorage, 500);
  emailInput.addEventListener('input', throttledSaveToLocalStorage);
  messageInput.addEventListener('input', throttledSaveToLocalStorage);

  loadFromLocalStorage();

  feedbackForm.addEventListener('submit', function (event) {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };

    saveToLocalStorage();

    console.log('Submitted Data:', formData);

    event.preventDefault();
  });
});
